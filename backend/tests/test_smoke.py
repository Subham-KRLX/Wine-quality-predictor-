"""Exercise the real bundled artifacts through the HTTP contract."""
import hashlib
import json
from pathlib import Path
import unittest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.schemas import WineFeatures
from ml_pipeline.evaluate_model import load_dataset

ROOT = Path(__file__).resolve().parents[2]


class SmokeTests(unittest.TestCase):
    def test_real_model_predicts_both_dataset_presets(self):
        report = json.loads((ROOT / 'frontend/src/data/evaluation.json').read_text())
        data = load_dataset()
        with TestClient(app) as client:
            for sample in report['samples']:
                values = {**sample['values'], 'type': int(sample['values']['type'])}
                expected = data[data['type'] == values['type']].iloc[sample['dataset_row']]
                for name, value in WineFeatures(**values).model_dump(by_alias=True).items():
                    self.assertEqual(value, expected[name])
                response = client.post('/predict', json=values)
                self.assertEqual(response.status_code, 200, response.text)
                result = response.json()
                self.assertGreaterEqual(result['quality_score'], 0)
                self.assertLessEqual(result['quality_score'], 10)
                expected_label = 'Good' if result['quality_score'] >= 7 else 'Medium' if result['quality_score'] >= 5 else 'Poor'
                self.assertEqual(result['quality_label'], expected_label)
                self.assertEqual(len(result['feature_importance']), 12)

    def test_published_dataset_checksum_matches_local_data(self):
        report = json.loads((ROOT / 'frontend/src/data/evaluation.json').read_text())
        fingerprint = hashlib.sha256()
        for name in ('winequality-red.csv', 'winequality-white.csv'):
            fingerprint.update((ROOT / 'ml_pipeline/data' / name).read_bytes())
        self.assertEqual(report['dataset_sha256'], fingerprint.hexdigest())
