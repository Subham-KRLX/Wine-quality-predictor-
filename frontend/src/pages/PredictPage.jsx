import React, { useState, useEffect, useRef } from 'react';
import PredictionForm from '../components/sections/PredictionForm';
import ResultSection from '../components/sections/ResultSection';
import FeatureImportanceSection from '../components/sections/FeatureImportanceSection';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { requestPrediction } from '../lib/prediction';

const PredictPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const activeRequest = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => () => activeRequest.current?.abort(), []);

  useEffect(() => {
    if (result) {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start',
      });
    }
  }, [result]);

  const handlePredict = async (data) => {
    activeRequest.current?.abort();
    const request = new AbortController();
    activeRequest.current = request;
    setLoading(true);
    setError(null);
    setFieldErrors({});
    setResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL?.trim()
        || (import.meta.env.DEV ? 'http://localhost:8000' : '');

      // Clean up data for the API
      const payload = {
        "fixed acidity": data.fixed_acidity,
        "volatile acidity": data.volatile_acidity,
        "citric acid": data.citric_acid,
        "residual sugar": data.residual_sugar,
        "chlorides": data.chlorides,
        "free sulfur dioxide": data.free_sulfur_dioxide,
        "total sulfur dioxide": data.total_sulfur_dioxide,
        "density": data.density,
        "pH": data.pH,
        "sulphates": data.sulphates,
        "alcohol": data.alcohol,
        "type": data.type
      };

      const prediction = await requestPrediction(payload, {
        apiUrl,
        signal: request.signal,
      });
      if (!request.signal.aborted) setResult(prediction);
    } catch (err) {
      if (!request.signal.aborted) {
        setError(err.message);
        setFieldErrors(err.fieldErrors || {});
      }
    } finally {
      if (activeRequest.current === request && !request.signal.aborted) {
        setLoading(false);
        activeRequest.current = null;
      }
    }
  };

  return (
    <div className="pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Predict Wine <span className="text-wine-500">Quality</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-charcoal-400 max-w-2xl mx-auto"
          >
            Enter the physicochemical properties of your wine sample below. Our machine learning model will analyze the data to estimate its quality on a scale of 0-10.
          </motion.p>
        </div>

        <PredictionForm onSubmit={handlePredict} isLoading={loading} serverErrors={fieldErrors} />

        <AnimatePresence>
          {error && (
            <motion.div
              role="alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8 p-4 bg-red-900/20 border border-red-500/50 rounded-2xl flex items-center gap-3 text-red-400 max-w-4xl mx-auto"
            >
              <AlertCircle className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div id="prediction-result" ref={resultRef} tabIndex={-1} aria-label="Prediction results" className="mt-12 space-y-12 min-h-[200px] scroll-mt-28">
          {result && (
            <>
              <ResultSection result={result} />
              <FeatureImportanceSection
                key={result.quality_score}
                importanceData={result.feature_importance}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
