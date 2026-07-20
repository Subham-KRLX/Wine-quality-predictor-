# Development Notes

VinoPredict is split into three main parts:

- `frontend/`: React and Vite application for the user interface.
- `backend/`: FastAPI service that loads model artifacts and serves predictions.
- `ml_pipeline/`: scripts and datasets used to train and save the model artifacts.

The backend reads serialized files from `backend/models/`. If those files are missing or need to be refreshed, run the training script from the repository root.

```bash
python ml_pipeline/train_model.py
```

Keep generated model files, API schemas, and frontend form fields aligned whenever the input feature list changes.
