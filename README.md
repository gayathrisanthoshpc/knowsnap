# 📸 KnowSnap - AI-Powered Screenshot Intelligence

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-0.104.1-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Tesseract--OCR-5.3.0-00A4EF?style=for-the-badge" alt="Tesseract OCR" />
  <img src="https://img.shields.io/badge/Tailwind--CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/SQLite-3.41.1-003B57?style=for-the-badge&logo=sqlite" alt="SQLite" />
</div>

<br />

<div align="center">
  <h3>Transform screenshots into actionable knowledge with AI-powered OCR and intelligent classification</h3>
  <p>✨ Modern glassmorphism UI • 🤖 Rule-based AI classification • 📱 PWA ready • 🚀 Fast & lightweight</p>
</div>

## 🌟 Features

### 🎨 **Modern Glassmorphism Design**
- Beautiful backdrop blur effects
- Gradient animations and floating elements
- Responsive design for all devices
- Dark theme with vibrant accents

### 🤖 **Intelligent Processing**
- **OCR Text Extraction**: Powered by Tesseract OCR
- **Smart Classification**: Rule-based categorization (Task, Reminder, Note, Code)
- **Action Item Detection**: Automatic extraction of actionable items
- **Real-time Processing**: Instant results with progress feedback

### 📱 **Progressive Web App**
- Installable on mobile and desktop
- Offline-capable interface
- Native app-like experience
- Optimized for touch interactions

### ⚡ **Performance Optimized**
- Fast React + Vite frontend
- Efficient FastAPI backend
- SQLite database for reliability
- Optimized bundle size

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **Tesseract OCR** installed on your system

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/knowsnap.git
   cd knowsnap
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   # Install Tesseract OCR (see instructions below)
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Application**
   ```bash
   # Terminal 1: Start Backend
   cd backend
   python main.py

   # Terminal 2: Start Frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Tesseract OCR Installation

### Windows
```bash
# Download from: https://github.com/UB-Mannheim/tesseract/wiki
# Add to PATH: C:\Program Files\Tesseract-OCR
```

### macOS
```bash
brew install tesseract
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
```

## 📖 API Documentation

Once the backend is running, visit:
- **API Docs**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`

## 🏗️ Project Structure

```
knowsnap/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # SQLAlchemy models
│   ├── database.py          # Database configuration
│   ├── ocr.py              # OCR processing
│   ├── classifier.py       # AI classification
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   ├── manifest.json   # PWA manifest
│   │   └── ...
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── UploadZone.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── App.jsx         # Main application
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   └── package.json        # Node dependencies
└── README.md
```

## 🎯 Usage

1. **Upload Screenshots**: Drag & drop or click to select image files
2. **AI Processing**: Automatic OCR text extraction and classification
3. **View Results**: Organized display with action items and metadata
4. **Filter & Search**: Use sidebar filters to find specific content types
5. **Manage Items**: Delete or organize your processed screenshots

## 🔧 Configuration

### Backend Environment Variables
```bash
# .env file in backend/
DATABASE_URL=sqlite:///./knowsnap.db
UPLOAD_FOLDER=./uploads
MAX_FILE_SIZE=10485760  # 10MB
```

### Frontend Configuration
```javascript
// src/config.js
export const API_BASE_URL = 'http://localhost:8000';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tesseract OCR** for text extraction
- **FastAPI** for the robust backend framework
- **React** for the modern frontend framework
- **Tailwind CSS** for the beautiful styling system

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/knowsnap/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/knowsnap/discussions)

---

<div align="center">
  <p>Made with ❤️ for productivity enthusiasts</p>
  <p>
    <a href="#features">Features</a> •
    <a href="#quick-start">Quick Start</a> •
    <a href="#api-documentation">API Docs</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

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