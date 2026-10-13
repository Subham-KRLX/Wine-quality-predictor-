import unittest
from unittest.mock import patch, Mock
from fastapi.testclient import TestClient
from backend.app.model import WineModel, ModelUnavailableError
from backend.app.schemas import WineFeatures
from backend.app.main import app


class ModelTests(unittest.TestCase):
    def artifacts(self):
        names = list(WineFeatures.model_config['json_schema_extra']['example'])
        model = Mock(n_features_in_=len(names), feature_importances_=[1 / len(names)] * len(names))
        scaler = Mock(n_features_in_=len(names), feature_names_in_=names)
        return model, scaler, names

    def test_valid_artifacts_preserve_feature_order(self):
        model, scaler, names = self.artifacts()
        model.predict.return_value = [5.5]
        with patch('backend.app.model.joblib.load', side_effect=[model, scaler, names]):
            service = WineModel()
        data = WineFeatures(**WineFeatures.model_config['json_schema_extra']['example'])
        self.assertEqual(service.predict(data), 5.5)
        scaler.transform.assert_called_once_with([[data.model_dump(by_alias=True)[name] for name in names]])
        self.assertEqual(len(service.get_feature_importance()), 12)

    def test_missing_corrupt_and_inconsistent_artifacts(self):
        model, scaler, names = self.artifacts()
        for artifacts in ([FileNotFoundError()], [ValueError('corrupt')],
                          [model, scaler, names[:-1]], [model, scaler, names[::-1]]):
            with self.subTest(artifacts=artifacts):
                with patch('backend.app.model.joblib.load', side_effect=artifacts), self.assertLogs('backend.app.model', level='ERROR'):
                    service = WineModel()
                with self.assertRaises(ModelUnavailableError):
                    service.get_feature_importance()

    def test_unavailable_model_returns_503(self):
        with patch('backend.app.model.joblib.load', side_effect=FileNotFoundError()), self.assertLogs('backend.app.model', level='ERROR'):
            service = WineModel()
        with patch('backend.app.main.model', service), TestClient(app) as client:
            self.assertEqual(client.get('/feature-importance').status_code, 503)
            response = client.post('/predict', json=WineFeatures.model_config['json_schema_extra']['example'])
            self.assertEqual(response.status_code, 503)

    def test_invalid_api_payload_returns_422(self):
        with TestClient(app) as client:
            payload = {**WineFeatures.model_config['json_schema_extra']['example'], 'pH': 20}
            self.assertEqual(client.post('/predict', json=payload).status_code, 422)
