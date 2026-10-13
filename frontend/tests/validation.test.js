import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateMeasurement } from '../src/lib/validation.js';

test('rejects invalid measurements and inconsistent sulfur inputs', () => {
  for (const [name, value] of [['alcohol', 101], ['pH', 15], ['density', 0],
    ['citric_acid', -1], ['chlorides', NaN], ['alcohol', Infinity]]) {
    assert.equal(typeof validateMeasurement(name, value, {}), 'string');
  }
  assert.equal(typeof validateMeasurement('total_sulfur_dioxide', 10, { free_sulfur_dioxide: 11 }), 'string');
  assert.equal(validateMeasurement('citric_acid', 0, {}), true);
  assert.equal(validateMeasurement('total_sulfur_dioxide', 11, { free_sulfur_dioxide: 11 }), true);
});
