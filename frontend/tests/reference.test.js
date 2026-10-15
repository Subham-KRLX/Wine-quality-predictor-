import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getRangeWarnings } from '../src/lib/wineReference.js';
import { validateMeasurement } from '../src/lib/validation.js';

const report = JSON.parse(readFileSync(new URL('../src/data/evaluation.json', import.meta.url)));

test('range warnings use wine type and include entered values and bounds', () => {
  const ranges = { '0': { alcohol: { min: 8, max: 14 } }, '1': { alcohol: { min: 8, max: 15 } } };
  assert.deepEqual(getRangeWarnings({ type: '0', alcohol: 14 }, ranges), []);
  assert.deepEqual(getRangeWarnings({ type: '1', alcohol: 15 }, ranges), []);
  assert.deepEqual(getRangeWarnings({ type: '0', alcohol: 15 }, ranges), [{ name: 'alcohol', value: 15, min: 8, max: 14 }]);
  assert.deepEqual(getRangeWarnings({ type: '0', alcohol: NaN }, ranges), []);
  assert.deepEqual(getRangeWarnings({ type: '0', alcohol: 101 }, ranges), []);
});

test('dataset presets pass all physical validation rules', () => {
  for (const sample of report.samples) {
    assert.ok([0, 1].includes(Number(sample.values.type)));
    assert.ok(sample.actual_quality >= 0 && sample.actual_quality <= 10);
    for (const [name, value] of Object.entries(sample.values)) {
      if (name !== 'type') assert.equal(validateMeasurement(name, value, sample.values), true, `${sample.name}: ${name}`);
    }
  }
});
