export function validateMeasurement(name, value, values) {
  if (!Number.isFinite(value)) return 'Enter a finite number';
  if (value < 0) return `Must be zero or greater (entered: ${value})`;
  if (name === 'density' && value === 0) return 'Density must be greater than zero';
  if (name === 'pH' && value > 14) return `pH must be between 0 and 14 (entered: ${value})`;
  if (name === 'alcohol' && value > 100) return `Alcohol must be between 0 and 100 percent (entered: ${value})`;
  if (name === 'total_sulfur_dioxide' && value < values.free_sulfur_dioxide) {
    return `Total SO2 (${value}) must be at least free SO2 (${values.free_sulfur_dioxide})`;
  }
  return true;
}
