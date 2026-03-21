<div align="center">

# 📸 KnowSnap
### *AI-Powered Screenshot Intelligence*

<br>

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white&style=flat-square)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-009688?logo=fastapi&logoColor=white&style=flat-square)
![Tesseract](https://img.shields.io/badge/Tesseract--OCR-5.3.0-4CAF50?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Tailwind--CSS-3.3.0-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square)
![SQLite](https://img.shields.io/badge/SQLite-3.41.1-003B57?logo=sqlite&logoColor=white&style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)
![Stars](https://img.shields.io/github/stars/gayathrisanthoshpc/knowsnap?style=flat-square&color=gold)

<br>

> *Transform screenshots into actionable knowledge*
> *with AI-powered OCR and intelligent classification.*

<br>

✨ Modern glassmorphism UI &nbsp;·&nbsp; 🤖 AI classification &nbsp;·&nbsp; 📱 PWA ready &nbsp;·&nbsp; ⚡ Fast & lightweight

</div>

---

## 🌟 Features

<table>
<tr>
<td width="50%">

**🎨 Modern Glassmorphism UI**
- Backdrop blur effects
- Gradient animations
- Responsive for all devices
- Dark theme with vibrant accents

</td>
<td width="50%">

**🤖 Intelligent Processing**
- OCR via Tesseract
- Smart classification (Task / Reminder / Note / Code)
- Action item detection
- Real-time processing with progress feedback

</td>
</tr>
<tr>
<td width="50%">

**📱 Progressive Web App**
- Installable on mobile & desktop
- Offline-capable interface
- Native app-like experience
- Touch optimized

</td>
<td width="50%">

**⚡ Performance**
- React + Vite frontend
- FastAPI backend
- SQLite for reliability
- Optimized bundle size

</td>
</tr>
</table>

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm
- Tesseract OCR (see below)

### 1. Clone
```bash
git clone https://github.com/gayathrisanthoshpc/knowsnap.git
cd knowsnap
```

### 2. Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload
# Runs at http://localhost:8000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

---

## 🛠️ Tesseract Installation

| Platform | Command |
|---|---|
| **Windows** | [Download installer](https://github.com/UB-Mannheim/tesseract/wiki) → add `C:\Program Files\Tesseract-OCR` to PATH |
| **macOS** | `brew install tesseract` |
| **Linux** | `sudo apt-get install tesseract-ocr` |

---

## 📖 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/upload` | Upload and process screenshot |
| `GET` | `/items` | Get all items (optional `?type=` filter) |
| `DELETE` | `/items/{id}` | Delete item by ID |

> 📚 Full docs at `http://localhost:8000/docs` after running backend

---

## 🎯 How to Use

1. **Upload** — drag & drop or click to select a screenshot
2. **Process** — click *Analyze Screenshot* for instant OCR
3. **View** — organized results with action items and metadata
4. **Filter** — use sidebar to filter by Task / Reminder / Note / Code
5. **Manage** — edit or delete processed items

---

## 🏗️ Project Structure
```
knowsnap/
├── backend/
│   ├── main.py            ← FastAPI app
│   ├── ocr.py             ← Tesseract OCR logic
│   ├── classifier.py      ← AI classification
│   ├── models.py          ← Database models
│   ├── database.py        ← DB configuration
│   ├── requirements.txt
│   └── uploads/           ← Stored images
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── UploadZone.jsx
    │   │   ├── ResultCard.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Sidebar.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── tailwind.config.js
```

---

## 🔧 Configuration
```bash
# backend/.env
DATABASE_URL=sqlite:///./knowsnap.db
UPLOAD_FOLDER=./uploads
MAX_FILE_SIZE=10485760
```
```js
// frontend/src/config.js
export const API_BASE_URL = 'http://localhost:8000';
```

---

## 🤝 Contributing
```bash
# 1. Fork → 2. Branch → 3. Commit → 4. Push → 5. PR
git checkout -b feature/amazing-feature
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature
```

---

## 🙏 Built With

[Tesseract OCR](https://github.com/tesseract-ocr/tesseract) &nbsp;·&nbsp;
[FastAPI](https://fastapi.tiangolo.com) &nbsp;·&nbsp;
[React](https://react.dev) &nbsp;·&nbsp;
[Tailwind CSS](https://tailwindcss.com)

---

<div align="center">

Made with ❤️ for productivity enthusiasts

[Features](#-features) &nbsp;·&nbsp; [Quick Start](#-quick-start) &nbsp;·&nbsp; [API Docs](#-api-endpoints) &nbsp;·&nbsp; [Contributing](#-contributing)

</div>
