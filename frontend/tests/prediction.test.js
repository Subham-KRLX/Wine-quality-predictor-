import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requestPrediction } from '../src/lib/prediction.js';

const options = { apiUrl: 'https://example.test/' };
const valid = { quality_score: 5.7, quality_label: 'Medium', feature_importance: { alcohol: 0.5 } };

test('posts JSON and normalizes trailing slash', async t => {
  t.mock.method(globalThis, 'fetch', async (url, init) => {
    assert.equal(url, 'https://example.test/predict');
    assert.equal(init.method, 'POST');
    assert.deepEqual(JSON.parse(init.body), { type: 0 });
    return Response.json(valid);
  });
  assert.deepEqual(await requestPrediction({ type: 0 }, options), valid);
});

test('reports validation, service and malformed-response errors', async t => {
  const fetch = t.mock.method(globalThis, 'fetch');
  for (const [status, expected] of [[422, /measurements/], [503, /unavailable/], [500, /could not complete/]]) {
    fetch.mock.mockImplementation(async () => new Response('', { status }));
    await assert.rejects(requestPrediction({}, options), expected);
  }
  for (const result of [null, {}, { ...valid, quality_score: '5' }, { ...valid, feature_importance: [] }]) {
    fetch.mock.mockImplementation(async () => Response.json(result));
    await assert.rejects(requestPrediction({}, options), /invalid result/);
  }
});

test('times out slow requests and supports caller cancellation', async t => {
  t.mock.method(globalThis, 'fetch', async (_, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
  }));
  await assert.rejects(requestPrediction({}, { ...options, timeoutMs: 10 }), /timed out/);
  const controller = new AbortController();
  const pending = requestPrediction({}, { ...options, signal: controller.signal });
  controller.abort();
  await assert.rejects(pending, { name: 'AbortError' });
});

test('missing configuration never sends a request', async t => {
  const fetch = t.mock.method(globalThis, 'fetch');
  await assert.rejects(requestPrediction({}, { apiUrl: '' }), /not configured/);
  assert.equal(fetch.mock.callCount(), 0);
});

test('accepts valid responses from the deployed API without feature importance', async t => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ quality_score: 5.137725000842364, quality_label: 'Medium' }));
  const result = await requestPrediction({}, options);
  assert.equal(result.quality_score, 5.137725000842364);
  assert.deepEqual(result.feature_importance, {});
});

test('maps backend rejection to the exact input field and entered value', async t => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ detail: [
    { loc: ['body', 'pH'], msg: 'Input should be less than or equal to 14' },
    { loc: ['body', 'fixed acidity'], msg: 'Input should be greater than or equal to 0' },
  ] }, { status: 422 }));
  await assert.rejects(requestPrediction({ pH: 15, 'fixed acidity': -2 }, options), error => {
    assert.match(error.fieldErrors.pH, /entered: 15/);
    assert.match(error.fieldErrors.fixed_acidity, /entered: -2/);
    return true;
  });
});
