import unittest
from pydantic import ValidationError
from backend.app.schemas import WineFeatures


def sample():
    return dict(WineFeatures.model_config['json_schema_extra']['example'])


class ValidationTests(unittest.TestCase):
    def test_valid_types_and_field_names(self):
        for wine_type in (0, 1):
            wine = WineFeatures(**{**sample(), 'type': wine_type})
            self.assertEqual(WineFeatures(**wine.model_dump()), wine)

    def test_invalid_measurements(self):
        for name in sample():
            if name == 'type':
                continue
            for value in (-1, float('nan'), float('inf')):
                with self.subTest(name=name, value=value), self.assertRaises(ValidationError):
                    WineFeatures(**{**sample(), name: value})

    def test_bounds_and_sulfur_consistency(self):
        for update in ({'density': 0}, {'pH': 15}, {'alcohol': 101},
                       {'type': 2}, {'type': True}, {'type': '0'},
                       {'free sulfur dioxide': 35}):
            with self.subTest(update=update), self.assertRaises(ValidationError):
                WineFeatures(**{**sample(), **update})

    def test_zero_and_equal_sulfur_allowed(self):
        wine = WineFeatures(**{**sample(), 'citric acid': 0, 'free sulfur dioxide': 34})
        self.assertEqual(wine.free_sulfur_dioxide, wine.total_sulfur_dioxide)
