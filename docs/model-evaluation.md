# Model evaluation

Run from the repository root:

```sh
python -m ml_pipeline.evaluate_model
python -m unittest discover -s backend/tests -v
```

The command writes `frontend/src/data/evaluation.json`. It never replaces the
production model, scaler, or feature names. The Evaluation page presents this
reference benchmark, not claimed metrics for whatever model Render currently serves.

The combined red/white UCI data is split 80/20 with seed 42. Identical feature
vectors stay together, including rows with different human ratings. Three-fold
GroupKFold on the training partition selects a candidate by MAE. Scaling is fitted
inside each fold. Only after selection are the selected candidate, depth-10 Random
Forest reference and mean baseline evaluated on the test partition.

The JSON records data checksums, package version, split sizes, rating frequencies,
fold scores, test MAE/RMSE/R², within-one-point rate, and errors by actual rating.
MAE and R² are not accuracy percentages. A few extreme-quality examples cannot
establish reliable performance for all poor or excellent wines.

Sample presets are real CSV rows, with zero-based row indices excluding the header.
They are held out of this benchmark but may have appeared in the older production
training data. Their human rating is a comparison, not a guaranteed prediction.

Reference ranges come only from this benchmark's training partition, separately
for red and white wine. They are warnings, not chemical validity limits or proof
that a combination is in distribution. Physical invalidity is checked separately.

Do not promote a candidate without versioned model artifacts, serving compatibility
checks and a deployment plan for both backend and frontend. No change here claims
to resolve the known tendency to underestimate rare high-quality wines.
