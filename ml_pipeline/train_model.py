import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

# Constants
DATA_DIR = "ml_pipeline/data"
MODEL_DIR = "backend/models"
os.makedirs(MODEL_DIR, exist_ok=True)

def load_data():
    red_wine = pd.read_csv(os.path.join(DATA_DIR, "winequality-red.csv"), sep=';')
    white_wine = pd.read_csv(os.path.join(DATA_DIR, "winequality-white.csv"), sep=';')
    
    # Add type column: 0 for red, 1 for white
    red_wine['type'] = 0
    white_wine['type'] = 1
    
    # Combine
    data = pd.concat([red_wine, white_wine], ignore_index=True)
    return data

def train():
    print("Loading data...")
    data = load_data()
    
    X = data.drop('quality', axis=1)
    y = data['quality']
    
    print(f"Data shape: {X.shape}")
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train Random Forest
    print("Training Random Forest Regressor...")
    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate
    predictions = model.predict(X_test_scaled)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    
    print(f"Model Performance:")
    print(f"MSE: {mse:.4f}")
    print(f"R2: {r2:.4f}")
    
    # Save
    print("Saving artifacts...")
    joblib.dump(model, os.path.join(MODEL_DIR, "wine_quality_model.pkl"))
    joblib.dump(scaler, os.path.join(MODEL_DIR, "scaler.pkl"))
    
    # Save feature names for inference alignment
    joblib.dump(X.columns.tolist(), os.path.join(MODEL_DIR, "feature_names.pkl"))
    
    print("Done!")

if __name__ == "__main__":
    train()
