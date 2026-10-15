import unittest
import numpy as np
import pandas as pd
from ml_pipeline.evaluate_model import metrics, split_groups


class EvaluationTests(unittest.TestCase):
    def test_identical_samples_never_cross_split(self):
        features = pd.DataFrame({'a': np.repeat(np.arange(30), 3), 'b': np.repeat(np.arange(30) * 2, 3)})
        train, test, groups = split_groups(features)
        self.assertFalse(set(groups[train]) & set(groups[test]))
        self.assertEqual(len(train) + len(test), len(features))
        repeated = split_groups(features)
        np.testing.assert_array_equal(train, repeated[0])
        np.testing.assert_array_equal(test, repeated[1])

    def test_metrics_expose_error_by_quality(self):
        result = metrics([3, 3, 8, 8], [5, 5, 6, 6])
        self.assertEqual(result['mae'], 2)
        self.assertEqual(result['within_one_point'], 0)
        self.assertEqual(result['by_rating'][0], {'rating': 3, 'count': 2, 'mean_prediction': 5.0, 'mae': 2.0})
