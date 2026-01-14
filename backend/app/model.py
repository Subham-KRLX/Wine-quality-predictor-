import joblib
import pandas as pd
import os
from .schemas import WineFeatures

# Get the absolute path to the directory containing this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "wine_quality_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")
FEATURE_NAMES_PATH = os.path.join(BASE_DIR, "models", "feature_names.pkl")

class WineModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.load_model()

    def load_model(self):
        if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH):
            self.model = joblib.load(MODEL_PATH)
            self.scaler = joblib.load(SCALER_PATH)
            if os.path.exists(FEATURE_NAMES_PATH):
                self.feature_names = joblib.load(FEATURE_NAMES_PATH)
            print("Model and scaler loaded successfully.")
        else:
            print("Model artifacts not found. Please train the model first.")

    def predict(self, input_data: WineFeatures):
        if not self.model or not self.scaler:
            raise Exception("Model not loaded")
        
        # Convert input to DataFrame
        data_dict = input_data.model_dump(by_alias=True)
        df = pd.DataFrame([data_dict])
        
        # Ensure column order matches training
        if self.feature_names:
            df = df[self.feature_names]
            
        # Scale
        scaled_data = self.scaler.transform(df)
        
        # Predict
        prediction = self.model.predict(scaled_data)
        return float(prediction[0])

    def get_feature_importance(self):
        if not self.model or not self.feature_names:
            return {}
        
        importances = self.model.feature_importances_
        return dict(zip(self.feature_names, importances))
