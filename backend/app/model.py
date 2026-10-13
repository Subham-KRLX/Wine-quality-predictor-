import joblib
import os
import logging
from .schemas import WineFeatures

# Resolve model artifacts relative to the backend package.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "wine_quality_model.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")
FEATURE_NAMES_PATH = os.path.join(BASE_DIR, "models", "feature_names.pkl")
logger = logging.getLogger(__name__)


class ModelUnavailableError(RuntimeError):
    pass


class WineModel:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.importance_cache = {}
        self.load_model()

    def load_model(self):
        self.model = self.scaler = self.feature_names = None
        self.importance_cache = {}
        try:
            model = joblib.load(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            names = joblib.load(FEATURE_NAMES_PATH)
            expected = {field.alias or name for name, field in WineFeatures.model_fields.items()}
            if not isinstance(names, list) or len(names) != len(expected) or set(names) != expected:
                raise ValueError("Feature names do not match the API schema")
            if model.n_features_in_ != len(names) or scaler.n_features_in_ != len(names):
                raise ValueError("Model and scaler feature counts do not match")
            if hasattr(scaler, 'feature_names_in_') and list(scaler.feature_names_in_) != names:
                raise ValueError("Scaler feature order does not match")
            importances = model.feature_importances_
            if len(importances) != len(names):
                raise ValueError("Feature importance count does not match")
            cache = {name: float(value) for name, value in zip(names, importances)}
            # Publish artifacts together only after their shared schema is validated.
            self.model, self.scaler, self.feature_names = model, scaler, names
            self.importance_cache = cache
        except Exception:
            logger.exception("Unable to load compatible wine model artifacts")

    def require_ready(self):
        if self.model is None or self.scaler is None or self.feature_names is None:
            raise ModelUnavailableError("Prediction model is unavailable. Please try again later.")

    def predict(self, input_data: WineFeatures):
        self.require_ready()

        # Convert input to dictionary with proper aliases
        data_dict = input_data.model_dump(by_alias=True)

        # Maintain consistent feature order without Pandas overhead
        ordered_data = [data_dict[name] for name in self.feature_names]

        # Reshape for scikit-learn (1 sample, N features)
        input_array = [ordered_data]

        # Scale and Predict
        scaled_data = self.scaler.transform(input_array)
        prediction = self.model.predict(scaled_data)

        return float(prediction[0])

    def get_feature_importance(self):
        self.require_ready()
        return self.importance_cache
