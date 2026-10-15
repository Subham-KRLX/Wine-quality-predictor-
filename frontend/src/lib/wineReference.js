import { validateMeasurement } from './validation.js';

export const measurementUnits = {
  fixed_acidity: 'g/L', volatile_acidity: 'g/L', citric_acid: 'g/L',
  residual_sugar: 'g/L', chlorides: 'g/L', free_sulfur_dioxide: 'mg/L',
  total_sulfur_dioxide: 'mg/L', density: 'g/cm³', pH: '', sulphates: 'g/L', alcohol: '% vol',
};

export function getRangeWarnings(values, rangesByType) {
  const ranges = rangesByType[String(values.type)] || {};
  return Object.entries(ranges).flatMap(([name, range]) => {
    const value = values[name];
    if (validateMeasurement(name, value, values) !== true || (value >= range.min && value <= range.max)) return [];
    return [{ name, value, min: range.min, max: range.max }];
  });
}
