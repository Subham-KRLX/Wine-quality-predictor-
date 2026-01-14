from pydantic import BaseModel, Field

class WineFeatures(BaseModel):
    fixed_acidity: float = Field(..., alias="fixed acidity")
    volatile_acidity: float = Field(..., alias="volatile acidity")
    citric_acid: float = Field(..., alias="citric acid")
    residual_sugar: float = Field(..., alias="residual sugar")
    chlorides: float = Field(..., alias="chlorides")
    free_sulfur_dioxide: float = Field(..., alias="free sulfur dioxide")
    total_sulfur_dioxide: float = Field(..., alias="total sulfur dioxide")
    density: float = Field(..., alias="density")
    pH: float = Field(..., alias="pH")
    sulphates: float = Field(..., alias="sulphates")
    alcohol: float = Field(..., alias="alcohol")
    type: int = Field(..., description="0 for red, 1 for white")

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "fixed acidity": 7.4,
                "volatile acidity": 0.7,
                "citric acid": 0.0,
                "residual sugar": 1.9,
                "chlorides": 0.076,
                "free sulfur dioxide": 11.0,
                "total sulfur dioxide": 34.0,
                "density": 0.9978,
                "pH": 3.51,
                "sulphates": 0.56,
                "alcohol": 9.4,
                "type": 0
            }
        }

class PredictionResponse(BaseModel):
    quality_score: float
    quality_label: str
    feature_importance: dict[str, float] = {}
