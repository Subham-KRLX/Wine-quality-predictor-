import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, FlaskConical, Beaker } from 'lucide-react';

const ModelExplanation = () => {
  const steps = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Sourcing",
      desc: "Based on the renowned UCI Wine Quality dataset, featuring thousands of samples of red and white variants.",
      color: "text-blue-400"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Algorithm",
      desc: "Utilizes a Random Forest Classifier to handle complex non-linear relationships between chemical markers.",
      color: "text-wine-400"
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "Physicochemical Analysis",
      desc: "Analyzes features like pH, density, and chlorides to determine the unique signature of the wine.",
      color: "text-cream-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 bg-charcoal-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Behind the <span className="text-wine-500">Science</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-charcoal-400 max-w-2xl mx-auto"
          >
            Our predictor isn't based on opinion—it's driven by rigorous data analysis and state-of-the-art machine learning.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl glass-card border-white/5"
            >
              <div className={`mb-6 ${step.color}`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-charcoal-300 leading-relaxed">
                {step.desc}
              </p>
              <div className="absolute top-4 right-8 text-6xl font-black text-white/5 select-none">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-3xl wine-gradient flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Beaker className="w-6 h-6" />
              Technical Foundation
            </h3>
            <p className="text-wine-100 max-w-xl">
              We leverage scikit-learn for model training and FastAPI for high-performance inference, ensuring that you get laboratory-quality results instantly.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-white/10 rounded-xl text-white font-medium backdrop-blur-sm">
              Random Forest
            </div>
            <div className="px-6 py-3 bg-white/10 rounded-xl text-white font-medium backdrop-blur-sm">
              UCI Dataset
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelExplanation;
