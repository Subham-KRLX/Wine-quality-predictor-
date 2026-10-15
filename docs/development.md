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

## Quality checks

```sh
pip install -r requirements-test.txt
python -m unittest discover -s backend/tests -v
cd frontend
npm ci
npm run lint
npm test
VITE_API_URL=/api npm run build
```

GitHub Actions runs frontend and backend checks for pushes to main and pull
requests. These checks report failures; Vercel Git deployments are managed
independently unless deployment checks or branch rules are configured.

Backend smoke tests load the actual bundled artifacts, predict both sample
presets through FastAPI, and verify their source data and dataset checksum.
Frontend tests cover validation, API response compatibility, cancellation,
timeouts, server errors, and reference-range warnings.

The test requirements pin the data/ML packages to the environment used for the
benchmark and bundled-model tests. Avoid casually upgrading scikit-learn for a
serialized model; retrain and verify compatibility deliberately.

See [model evaluation](model-evaluation.md) to reproduce the grouped benchmark.
