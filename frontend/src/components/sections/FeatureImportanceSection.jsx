import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3, Info } from 'lucide-react';

const FeatureImportanceSection = ({ importanceData }) => {
  // If no data or empty object, don't render
  if (!importanceData || Object.keys(importanceData).length === 0) {
    return null;
  }

  const formattedData = Object.entries(importanceData)
    .map(([name, value]) => ({
      name: name.replace(/_/g, ' '),
      value: typeof value === 'number' ? value : parseFloat(value) || 0
    }))
    .sort((a, b) => b.value - a.value);

  if (formattedData.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 p-8 rounded-3xl glass-card border-white/5"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cream-400" />
            Feature Importance
          </h3>
          <p className="text-charcoal-400 text-sm mt-1">Understanding which chemical markers drive the prediction model.</p>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: '#888888', fontSize: 12 }}
              width={150}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff'
              }}
              itemStyle={{ color: '#be123c' }}
              formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Weight']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {formattedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#be123c' : '#454545'}
                  className="hover:fill-wine-500 transition-colors duration-300"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
          <Info className="w-5 h-5 text-wine-400 mt-1" />
          <p className="text-xs text-charcoal-400 leading-relaxed">
            <strong>Alcohol</strong> and <strong>Sulphates</strong> often play a critical role in determining perceived quality.
          </p>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
          <Info className="w-5 h-5 text-cream-400 mt-1" />
          <p className="text-xs text-charcoal-400 leading-relaxed">
            Weights represent the relative importance of each feature in the Random Forest ensemble.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureImportanceSection;
