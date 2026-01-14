from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import WineFeatures, PredictionResponse
from .model import WineModel

app = FastAPI(title="Wine Quality Predictor API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
model = WineModel()

@app.get("/")
def read_root():
    return {"message": "Welcome to Wine Quality Predictor API"}

@app.post("/predict", response_model=PredictionResponse)
def predict_quality(features: WineFeatures):
    try:
        score = model.predict(features)
        
        # Determine label
        if score >= 7:
            label = "Good"
        elif score >= 5:
            label = "Medium"
        else:
            label = "Poor"
            
        return PredictionResponse(
            quality_score=score, 
            quality_label=label,
            feature_importance=model.get_feature_importance()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/feature-importance")
def get_feature_importance():
    try:
        return model.get_feature_importance()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
