from typing import Annotated
from pydantic import BaseModel, Field, model_validator


Measurement = Annotated[float, Field(ge=0, allow_inf_nan=False)]


class WineFeatures(BaseModel):
    fixed_acidity: Measurement = Field(..., alias="fixed acidity")
    volatile_acidity: Measurement = Field(..., alias="volatile acidity")
    citric_acid: Measurement = Field(..., alias="citric acid")
    residual_sugar: Measurement = Field(..., alias="residual sugar")
    chlorides: Measurement = Field(..., alias="chlorides")
    free_sulfur_dioxide: Measurement = Field(..., alias="free sulfur dioxide")
    total_sulfur_dioxide: Measurement = Field(..., alias="total sulfur dioxide")
    density: float = Field(..., gt=0, allow_inf_nan=False)
    pH: Measurement = Field(..., le=14)
    sulphates: Measurement
    alcohol: Measurement = Field(..., le=100)
    type: int = Field(..., strict=True, ge=0, le=1, description="0 for red, 1 for white")

    @model_validator(mode="after")
    def validate_sulfur(self):
        if self.free_sulfur_dioxide > self.total_sulfur_dioxide:
            raise ValueError("Free SO2 cannot exceed total SO2")
        return self

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
                "type": 0,
            }
        }


class PredictionResponse(BaseModel):
    quality_score: float
    quality_label: str
    feature_importance: dict[str, float] = {}
