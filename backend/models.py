from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
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
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "extracted_text": self.extracted_text,
            "type": self.type,
            "title": self.title,
            "summary": self.summary,
            "actions": json.loads(self.actions) if self.actions else [],
            "created_at": self.created_at.isoformat() if self.created_at else None
        }