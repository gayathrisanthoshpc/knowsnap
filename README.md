# KnowSnap

A full-stack web application that extracts text from screenshots using OCR and classifies the content into tasks, reminders, notes, or code snippets using intelligent rule-based classification.

## Features

- Upload screenshots (PNG, JPG, JPEG, WebP)
- Automatic text extraction using Tesseract OCR
- Smart rule-based content classification (no API keys required!)
- Organize content into Tasks, Reminders, Notes, or Code
- Clean, responsive React frontend with TailwindCSS
- FastAPI backend with SQLite database

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Python + FastAPI
- **OCR**: Tesseract OCR
- **Classification**: Rule-based keyword matching (free!)
- **Database**: SQLite + SQLAlchemy
- **File Storage**: Local filesystem

## Setup Instructions

### Prerequisites

1. **Python 3.8+**
2. **Node.js 16+**
3. **Tesseract OCR** (see installation below)

### Install Tesseract OCR

#### Windows
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install and add to PATH
3. Verify: `tesseract --version`

#### macOS
```bash
brew install tesseract
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd knowsnap/backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend:
```bash
uvicorn main:app --reload
```

Backend will be available at: http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd knowsnap/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will be available at: http://localhost:5173

## Usage

1. Open the frontend in your browser
2. Drag and drop a screenshot or click to browse
3. Click "Analyze Screenshot" to process
4. View classified content in the dashboard
5. Filter by type (Tasks, Reminders, Notes, Code)
6. Delete items as needed

## API Endpoints

- `POST /upload` - Upload and process screenshot
- `GET /items` - Get all items (optional ?type= filter)
- `DELETE /items/{id}` - Delete item by ID

## Project Structure

```
knowsnap/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── ocr.py               # OCR logic
│   ├── classifier.py        # AI classification
│   ├── models.py            # Database models
│   ├── database.py          # DB setup
│   ├── requirements.txt
│   └── uploads/             # Stored images
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── UploadZone.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── Dashboard.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Example Screenshots

### Upload Interface
![Upload Interface](https://via.placeholder.com/600x300?text=Upload+Interface)

### Dashboard with Results
![Dashboard](https://via.placeholder.com/600x300?text=Dashboard+with+Results)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details