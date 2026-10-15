import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Info } from 'lucide-react';

const ResultSection = ({ result }) => {
  if (!result) return null;

  const { quality_score, quality_label } = result;

  const getColor = (label) => {
    if (!label) return 'text-white';
    switch (label.toLowerCase()) {
      case 'good': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'poor': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getProgressColor = (score) => {
    if (score >= 7) return 'bg-green-500';
    if (score >= 5) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-12 p-8 md:p-12 rounded-3xl glass-card border-wine-500/20 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Award className="w-32 h-32" />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="text-center md:text-left">
          <h3 className="text-charcoal-400 font-bold tracking-widest uppercase text-sm mb-2">Predicted Quality</h3>
          <div className="flex items-baseline gap-4 justify-center md:justify-start">
            <span className="text-5xl sm:text-7xl md:text-8xl font-black text-white">{quality_score.toFixed(2)}</span>
            <span className="text-2xl text-charcoal-500 font-bold">/ 10</span>
          </div>
          <div className={`mt-4 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 ${getColor(quality_label)}`}>
            <Award className="w-5 h-5" />
            <span className="text-xl font-bold">{quality_label}</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-wine-400" />
                Quality Spectrum
              </span>
              <span className="text-charcoal-400 text-sm italic">Lower Bound: 0.0 — Upper Bound: 10.0</span>
            </div>
            <div className="h-4 w-full bg-charcoal-900 rounded-full overflow-hidden p-1 border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${quality_score * 10}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`h-full rounded-full shadow-lg ${getProgressColor(quality_score)}`}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-charcoal-500 font-bold uppercase tracking-tighter">
              <span>Poor</span>
              <span>Average</span>
              <span>Exceptional</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-charcoal-900/50 border border-white/5 flex gap-4">
            <Info className="w-6 h-6 text-cream-400 flex-shrink-0" />
            <p className="text-sm text-charcoal-300 leading-relaxed">
              Estimated quality: <strong>{quality_score.toFixed(2)}/10</strong> ({quality_label}). Decimal places show small model changes, not guaranteed measurement precision.
            </p>
          </div>
        </div>
      </div>
      {result.context?.rangeWarnings?.length > 0 && <p role="status" className="mt-6 text-amber-300 text-sm relative z-10">
        This sample includes readings outside the reference training range. Treat the estimate with caution.
      </p>}
      {result.context?.sample && <p className="mt-6 text-charcoal-200 text-sm relative z-10">
        Recorded dataset rating: {result.context.sample.actual_quality}/10.
        {' '}Difference from this prediction: {Math.abs(quality_score - result.context.sample.actual_quality).toFixed(2)} points.
        {' '}One example does not measure overall accuracy.
      </p>}
    </motion.div>
  );
};

export default ResultSection;
