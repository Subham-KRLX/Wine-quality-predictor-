"""Compare regressors without changing the deployed model artifacts."""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
import pandas as pd
import sklearn
from sklearn.base import clone
from sklearn.dummy import DummyRegressor
from sklearn.ensemble import ExtraTreesRegressor, RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import GroupKFold, GroupShuffleSplit, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ROOT = Path(__file__).resolve().parents[1]


def load_dataset():
    frames = []
    for wine_type, filename in enumerate(('winequality-red.csv', 'winequality-white.csv')):
        frame = pd.read_csv(ROOT / 'ml_pipeline/data' / filename, sep=';')
        frame['type'] = wine_type
        frames.append(frame)
    return pd.concat(frames, ignore_index=True)


def split_groups(features):
    # Identical measurements stay together even when their human ratings differ.
    groups = pd.util.hash_pandas_object(features, index=False).to_numpy()
    train, test = next(GroupShuffleSplit(n_splits=1, test_size=0.2, random_state=42).split(features, groups=groups))
    return train, test, groups


def metrics(actual, predicted):
    actual, predicted = np.asarray(actual), np.asarray(predicted)
    return {
        'mae': float(mean_absolute_error(actual, predicted)),
        'rmse': float(np.sqrt(mean_squared_error(actual, predicted))),
        'r2': float(r2_score(actual, predicted)),
        'within_one_point': float(np.mean(np.abs(actual - predicted) <= 1)),
        'by_rating': [
            {'rating': int(rating), 'count': int(np.sum(actual == rating)),
             'mean_prediction': float(predicted[actual == rating].mean()),
             'mae': float(np.abs(actual[actual == rating] - predicted[actual == rating]).mean())}
            for rating in np.unique(actual)
        ],
    }


def evaluate():
    data = load_dataset()
    features, target = data.drop(columns='quality'), data['quality']
    train, test, groups = split_groups(features)
    candidates = {
        'Mean baseline': DummyRegressor(strategy='mean'),
        'Random Forest depth 10': RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1),
        'Random Forest unrestricted': RandomForestRegressor(n_estimators=150, random_state=42, n_jobs=-1),
        'Extra Trees': ExtraTreesRegressor(n_estimators=150, random_state=42, n_jobs=-1),
    }
    validation = []
    for name, estimator in candidates.items():
        pipeline = make_pipeline(StandardScaler(), estimator)
        scores = -cross_val_score(pipeline, features.iloc[train], target.iloc[train],
                                  groups=groups[train], cv=GroupKFold(3),
                                  scoring='neg_mean_absolute_error', n_jobs=1)
        validation.append({'name': name, 'cv_mae': float(scores.mean()), 'cv_std': float(scores.std())})
        print(f'{name}: cross-validation MAE {scores.mean():.4f}', flush=True)

    # Choose using training-fold results; the test set does not select the winner.
    selected = min(validation, key=lambda result: result['cv_mae'])['name']
    results = []
    for name in dict.fromkeys(['Mean baseline', 'Random Forest depth 10', selected]):
        pipeline = make_pipeline(StandardScaler(), clone(candidates[name]))
        pipeline.fit(features.iloc[train], target.iloc[train])
        results.append({'name': name, **metrics(target.iloc[test], pipeline.predict(features.iloc[test]))})

    ranges = {}
    for wine_type in (0, 1):
        observed = features.iloc[train].loc[features.iloc[train]['type'] == wine_type]
        ranges[str(wine_type)] = {
            name.replace(' ', '_'): {'min': float(observed[name].min()), 'max': float(observed[name].max())}
            for name in features.columns if name != 'type'
        }
    samples = []
    for wine_type in (0, 1):
        index = int(next(index for index in test if data.iloc[index]['type'] == wine_type))
        row = data.iloc[index]
        samples.append({
            'name': 'Red wine sample' if wine_type == 0 else 'White wine sample',
            'dataset_row': int(index if wine_type == 0 else index - int((data['type'] == 0).sum())),
            'actual_quality': int(row['quality']),
            'values': {name.replace(' ', '_'): (str(int(row[name])) if name == 'type' else float(row[name]))
                       for name in features.columns},
        })
    fingerprint = hashlib.sha256()
    for filename in ('winequality-red.csv', 'winequality-white.csv'):
        fingerprint.update((ROOT / 'ml_pipeline/data' / filename).read_bytes())
    return {
        'schema_version': 1, 'dataset_sha256': fingerprint.hexdigest(),
        'sklearn_version': sklearn.__version__, 'seed': 42,
        'source': 'https://archive.ics.uci.edu/dataset/186/wine+quality',
        'sample_count': len(data), 'train_count': len(train), 'test_count': len(test),
        'duplicate_feature_rows': int(features.duplicated().sum()),
        'rating_counts': {str(int(rating)): int(count) for rating, count in target.value_counts().sort_index().items()},
        'method': 'Identical feature rows grouped; 80/20 group split; 3-fold grouped cross-validation on training data only.',
        'scope': 'Reproducible benchmark. These scores evaluate freshly fitted candidates, not the currently hosted model. No production artifacts are replaced.',
        'selected': selected, 'validation': validation, 'test_results': results,
        'reference_ranges': ranges, 'samples': samples,
        'range_scope': 'Observed ranges from benchmark training rows. A value inside these bounds can still be unfamiliar in combination.',
        'sample_scope': 'Real UCI samples held out of this benchmark. They may have appeared in the older production model training data.',
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'frontend/src/data/evaluation.json')
    args = parser.parse_args()
    report = evaluate()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, allow_nan=False) + '\n')
    print(f'Report saved to {args.output}', flush=True)


if __name__ == '__main__':
    main()
