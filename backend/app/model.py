import joblib
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
            
            # Pre-calculate and cache feature importance
            self.importance_cache = None
            if self.model and hasattr(self.model, 'feature_importances_') and self.feature_names:
                importances = self.model.feature_importances_
                self.importance_cache = {str(name): float(imp) for name, imp in zip(self.feature_names, importances)}
                print(f"Importance cache created with {len(self.importance_cache)} features.")
                
            print("Model and scaler loaded successfully.")
        else:
            print("Model artifacts not found. Please train the model first.")

    def predict(self, input_data: WineFeatures):
        if not self.model or not self.scaler:
            raise Exception("Model not loaded")
        
        # Convert input to dictionary with proper aliases
        data_dict = input_data.model_dump(by_alias=True)
        
        # Maintain consistent feature order without Pandas overhead
        if self.feature_names:
            ordered_data = [data_dict.get(name, 0) for name in self.feature_names]
        else:
            # Fallback if feature names are missing
            ordered_data = list(data_dict.values())
            
        # Reshape for scikit-learn (1 sample, N features)
        input_array = [ordered_data]
            
        # Scale and Predict
        scaled_data = self.scaler.transform(input_array)
        prediction = self.model.predict(scaled_data)
        
        return float(prediction[0])

    def get_feature_importance(self):
        return self.importance_cache or {}
