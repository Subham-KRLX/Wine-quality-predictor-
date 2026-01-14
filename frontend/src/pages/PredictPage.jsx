import React, { useState } from 'react';
import PredictionForm from '../components/sections/PredictionForm';
import ResultSection from '../components/sections/ResultSection';
import FeatureImportanceSection from '../components/sections/FeatureImportanceSection';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const PredictPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastType, setLastType] = useState(0);

  const handlePredict = async (data) => {
    setLoading(true);
    setError(null);
    setLastType(data.type);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

      // Clean up data for the API
      const payload = {
        "fixed acidity": parseFloat(data.fixed_acidity),
        "volatile acidity": parseFloat(data.volatile_acidity),
        "citric acid": parseFloat(data.citric_acid),
        "residual sugar": parseFloat(data.residual_sugar),
        "chlorides": parseFloat(data.chlorides),
        "free sulfur dioxide": parseFloat(data.free_sulfur_dioxide),
        "total sulfur dioxide": parseFloat(data.total_sulfur_dioxide),
        "density": parseFloat(data.density),
        "pH": parseFloat(data.pH),
        "sulphates": parseFloat(data.sulphates),
        "alcohol": parseFloat(data.alcohol),
        "type": parseInt(data.type)
      };

      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Could not get prediction from the server.');
      }

      const prediction = await response.json();
      setResult(prediction);

      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({
          top: document.getElementById('prediction-result')?.offsetTop - 100,
          behavior: 'smooth'
        });
      }, 100);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

        <PredictionForm onSubmit={handlePredict} isLoading={loading} />

        <AnimatePresence>
          {error && (
            <motion.div
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

        <div id="prediction-result">
          <ResultSection result={result} />
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FeatureImportanceSection wineType={lastType} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictPage;
