export class PredictionValidationError extends Error {
  constructor(fieldErrors) {
    super('Please correct the highlighted readings and analyze again.');
    this.fieldErrors = fieldErrors;
  }
}

export async function requestPrediction(payload, { apiUrl, signal, timeoutMs = 30000 }) {
  if (!apiUrl) throw new Error('Prediction service is not configured. Please contact the site owner.');
  const controller = new AbortController();
  const cancel = () => controller.abort();
  signal?.addEventListener('abort', cancel, { once: true });
  if (signal?.aborted) cancel();
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(`${apiUrl.replace(/\/+$/, '')}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      if (response.status === 422) {
        const body = await response.json().catch(() => ({}));
        const fields = {};
        for (const issue of Array.isArray(body.detail) ? body.detail : []) {
          let field = issue.loc?.[1];
          if (!field && issue.msg?.includes('Free SO2')) field = 'total sulfur dioxide';
          if (typeof field === 'string' && Object.hasOwn(payload, field)) {
            const name = field.replaceAll(' ', '_');
            const value = payload[field];
            fields[name] = `${issue.msg || 'Invalid reading'} (entered: ${value})`;
          }
        }
        if (Object.keys(fields).length) throw new PredictionValidationError(fields);
        throw new Error('Please check your measurements and wine type. Some values were rejected.');
      }
      if (response.status === 503) throw new Error('The prediction model is temporarily unavailable. Please try again later.');
      throw new Error('The prediction service could not complete your request. Please try again.');
    }
    const prediction = await response.json();
    // Older deployed APIs return the prediction without the optional explanation data.
    const importance = prediction?.feature_importance ?? {};
    if (!prediction || !Number.isFinite(prediction.quality_score)
      || prediction.quality_score < 0 || prediction.quality_score > 10
      || !['Good', 'Medium', 'Poor'].includes(prediction.quality_label)
      || Array.isArray(importance) || typeof importance !== 'object'
      || Object.values(importance).some(value => !Number.isFinite(value) || value < 0 || value > 1)) {
      throw new Error('The prediction service returned an invalid result. Please try again.');
    }
    return { ...prediction, feature_importance: importance };
  } catch (error) {
    if (signal?.aborted) throw error;
    if (timedOut) throw new Error('Prediction timed out. The service may be starting up. Please try again.');
    if (error instanceof TypeError) throw new Error('Cannot reach the prediction service. Check your connection and try again.');
    if (error instanceof SyntaxError) throw new Error('The prediction service returned an invalid response. Please try again.');
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', cancel);
  }
}
