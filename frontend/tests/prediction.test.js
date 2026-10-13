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
