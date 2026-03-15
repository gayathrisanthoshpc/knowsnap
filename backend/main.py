from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os
import uuid
from pathlib import Path
from typing import Optional
import json

from database import get_db, engine, Base
from models import Item
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
            actions=json.dumps(classification["actions"])
        )
        db.add(item)
        db.commit()
        db.refresh(item)
        
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

@app.get("/")
def root():
    return {"message": "KnowSnap API"}