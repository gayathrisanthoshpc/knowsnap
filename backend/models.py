from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base
import json

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    filename = Column(String, index=True)
    extracted_text = Column(Text)
    type = Column(String)  # TASK, REMINDER, NOTE, CODE
    title = Column(String)
    summary = Column(Text)
    actions = Column(Text)  # JSON string
    completed = Column(Boolean, default=False)
    due_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationship to timeline
    timeline_entries = relationship("TimelineEntry", back_populates="item", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "extracted_text": self.extracted_text,
            "type": self.type,
            "title": self.title,
            "summary": self.summary,
            "actions": json.loads(self.actions) if self.actions else [],
            "completed": self.completed,
            "due_date": self.due_date.isoformat() if self.due_date else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }

class TimelineEntry(Base):
    __tablename__ = "timeline_entries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    action = Column(String, nullable=False)  # UPLOAD, EDIT, CATEGORY_CHANGE, COMPLETED, DUE_DATE_SET
    old_value = Column(Text, nullable=True)
    new_value = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship back to item
    item = relationship("Item", back_populates="timeline_entries")

    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "action": self.action,
            "old_value": self.old_value,
            "new_value": self.new_value,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }