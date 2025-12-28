# Wine Quality Predictor

A full-stack machine learning application to predict wine quality based on physicochemical properties.

## Tech Stack
- **Backend**: FastAPI
- **Frontend**: React + Vite + TailwindCSS
- **ML Model**: Random Forest (Scikit-learn)
- **Deployment**: Docker

## Features
- Interactive Web UI
- Real-time prediction
- Feature importance visualization
- Responsive design

## Quick Start (Docker)

1. **Build and Run**
   ```bash
   docker-compose up --build
   ```

2. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/docs

## Manual Setup

### Backend
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python ml_pipeline/train_model.py  # Train model first
uvicorn backend.app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
