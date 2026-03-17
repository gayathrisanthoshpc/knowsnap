from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import uuid
from pathlib import Path
from typing import Optional
import json
from datetime import datetime

from database import get_db, engine, Base
from models import Item, TimelineEntry
from ocr import extract_text_from_image
from classifier import classify_text

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="KnowSnap", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def validate_file(file: UploadFile):
    """Validate uploaded file."""
    if file.filename.split(".")[-1].lower() not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only image files (png, jpg, jpeg, webp) are allowed")
    
    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size must be less than 10MB")

def create_timeline_entry(db: Session, item_id: int, action: str, old_value: str = None, new_value: str = None):
    """Create a timeline entry for tracking item changes."""
    timeline_entry = TimelineEntry(
        item_id=item_id,
        action=action,
        old_value=old_value,
        new_value=new_value
    )
    db.add(timeline_entry)
    db.commit()

@app.post("/upload")
async def upload_screenshot(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload a screenshot, extract text, classify, and save to database."""
    try:
        # Validate file
        validate_file(file)
        
        # Generate unique filename
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Extract text
        extracted_text = extract_text_from_image(file_path)
        if not extracted_text:
            os.remove(file_path)  # Clean up
            raise HTTPException(status_code=400, detail="No text could be extracted from this image")
        
        # Classify text
        classification = classify_text(extracted_text)
        
        # Save to database
        item = Item(
            filename=unique_filename,
            extracted_text=extracted_text,
            type=classification["type"],
            title=classification["title"],
            summary=classification["summary"],
            actions=json.dumps(classification["actions"]),
            due_date=datetime.fromisoformat(classification["due_date"]) if classification.get("due_date") else None
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        
        # Create timeline entry for upload
        create_timeline_entry(db, item.id, "UPLOAD", None, f"Uploaded {item.type}: {item.title}")
        
        return item.to_dict()
    
    except Exception as e:
        # Clean up file if it was saved
        if 'file_path' in locals() and file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/items")
def get_items(type_filter: Optional[str] = Query(None, enum=["TASK", "REMINDER", "NOTE", "CODE"]), db: Session = Depends(get_db)):
    """Get all items, optionally filtered by type."""
    query = db.query(Item)
    if type_filter:
        query = query.filter(Item.type == type_filter)
    
    items = query.all()
    return [item.to_dict() for item in items]

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    """Delete an item by ID."""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Remove file
    file_path = UPLOAD_DIR / item.filename
    if file_path.exists():
        os.remove(file_path)
    
    # Remove from database
    db.delete(item)
    db.commit()
    
    return {"message": "Item deleted successfully"}

@app.put("/items/{item_id}")
def update_item(item_id: int, update_data: dict = Body(...), db: Session = Depends(get_db)):
    """Update an item by ID."""
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    # Track changes for timeline
    changes = []
    
    # Update fields and track changes
    if "extracted_text" in update_data and update_data["extracted_text"] != item.extracted_text:
        changes.append(("EDIT", item.extracted_text, update_data["extracted_text"]))
        item.extracted_text = update_data["extracted_text"]
    
    if "type" in update_data and update_data["type"] != item.type:
        changes.append(("CATEGORY_CHANGE", item.type, update_data["type"]))
        item.type = update_data["type"]
    
    if "completed" in update_data and update_data["completed"] != item.completed:
        changes.append(("COMPLETED" if update_data["completed"] else "UNCOMPLETED", str(item.completed), str(update_data["completed"])))
        item.completed = update_data["completed"]
    
    if "due_date" in update_data:
        old_due_date = item.due_date.isoformat() if item.due_date else None
        new_due_date = update_data["due_date"]
        if old_due_date != new_due_date:
            changes.append(("DUE_DATE_SET", old_due_date, new_due_date))
            item.due_date = datetime.fromisoformat(new_due_date) if new_due_date else None
    
    # Commit the item update
    db.commit()
    db.refresh(item)
    
    # Create timeline entries for changes
    for action, old_val, new_val in changes:
        create_timeline_entry(db, item.id, action, old_val, new_val)
    
    return item.to_dict()

@app.get("/timeline")
def get_timeline(limit: int = Query(50, description="Number of timeline entries to return"), db: Session = Depends(get_db)):
    """Get recent timeline entries."""
    timeline_entries = db.query(TimelineEntry).order_by(TimelineEntry.created_at.desc()).limit(limit).all()
    
    # Get associated items for richer data
    result = []
    for entry in timeline_entries:
        item = db.query(Item).filter(Item.id == entry.item_id).first()
        if item:
            result.append({
                **entry.to_dict(),
                "item_title": item.title,
                "item_type": item.type
            })
    
    return result

@app.get("/")
def root():
    return {"message": "KnowSnap API"}

if __name__ == "__main__":
    import uvicorn
    print("Starting KnowSnap API server...")
    uvicorn.run(app, host="localhost", port=8000)