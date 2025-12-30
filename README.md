# Wine Quality Predictor

A full-stack machine learning application to predict wine quality based on physicochemical properties.

## 🚀 Live Demo
- **Frontend App**: [https://wine-quality-predictor-pi.vercel.app](https://wine-quality-predictor-pi.vercel.app)
- **Backend API Docs**: [https://wine-quality-backend.onrender.com/docs](https://wine-quality-backend.onrender.com/docs)

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS (Deployed on Vercel)
- **Backend**: FastAPI (Deployed on Render)
- **ML Model**: Random Forest (Scikit-learn)
- **Deployment**: Docker, Vercel, Render

## Features
- Interactive Web UI with modern design
- Real-time quality prediction using ML
- Feature importance visualization
- Responsive mobile-first design

---

## 💻 Local Development Setup

If you want to run this project locally on your machine:

### 1. Backend Setup
```bash
# Navigate to root directory
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Train the model (Required for first run)
python ml_pipeline/train_model.py

# Start the server
uvicorn backend.app.main:app --reload
```
The API will run at `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The App will run at `http://localhost:5173`.

### 3. Docker (Optional)
```bash
docker-compose up --build
```
