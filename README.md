# 🛡️ Anti-Doping AI Assistant

An AI-powered web application that helps athletes, coaches, and sports professionals verify whether medicines or substances comply with the World Anti-Doping Agency (WADA) regulations.

The platform supports text-based searches, prescription image analysis using OCR, AI-powered explanations with Google Gemini, secure user authentication, and search history tracking.

---

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- 👤 Athlete Profile Management
- 💊 Medicine & Substance Verification
- 📷 Prescription Image Analysis (OCR)
- 🤖 AI-powered Explanations using Google Gemini
- 📜 Search History
- 🎤 Voice Input Support
- 📚 WADA Database Integration
- 📱 Responsive Modern UI

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router

### Backend
- FastAPI
- Python
- SQLite
- SQLAlchemy
- JWT Authentication

### AI & NLP
- Google Gemini API
- EasyOCR
- RapidFuzz

---

## 📂 Project Structure

```
Anti-Doping-AI-Assistant
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── database
│   ├── modules
│   ├── app.py
│   ├── auth_routes.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Anti-Doping-AI-Assistant.git
cd Anti-Doping-AI-Assistant
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend folder.

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
JWT_SECRET=YOUR_SECRET_KEY
```

Start the backend

```bash
uvicorn app:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file

```
VITE_API_URL=http://localhost:8000
```

Start the frontend

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Backend

```
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secret_key
```

### Frontend

```
VITE_API_URL=http://localhost:8000
```

---

## 📸 Screenshots

Add screenshots of:

- Landing Page
- Login
- Dashboard
- Text Medicine Check
- Prescription OCR
- Search History

---

## 📌 Future Enhancements

- MongoDB/PostgreSQL Support
- Medicine Barcode Scanner
- Multi-language Support
- WADA API Integration
- Athlete Risk Score
- Mobile Application

---

## 📝 Notes

- The SQLite database (`users.db`) is generated automatically on first run and is intentionally excluded from version control.
- Google Gemini API is used for AI-generated medicine explanations.
- OCR is powered by EasyOCR.

---

## 👨‍💻 Author

**Shubham Kumar**
DTU | Computer Science Engineering

