import React from 'react';
import { motion } from 'framer-motion';
import { Wine, ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const Hero = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-wine-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream-900/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-wine-300 text-sm font-medium border-wine-500/30"
        >
          <Wine className="w-4 h-4" />
          <span>AI-Powered Sommelier Experience</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Predict Wine Quality with <br />
          <span className="text-gradient">Precision Machine Learning</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-charcoal-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Unlock the secrets of oenology. Our advanced Random Forest model analyzes physicochemical properties to provide instant, professional-grade quality assessments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onGetStarted}
            className="group relative px-8 py-4 bg-wine-700 hover:bg-wine-600 text-white rounded-xl font-bold transition-all duration-300 shadow-xl shadow-wine-900/20 flex items-center gap-2"
          >
            Predict Quality
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#how-it-works"
            className="px-8 py-4 glass-card hover:bg-white/10 text-white rounded-xl font-bold transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {[
            {
              icon: <Zap className="w-6 h-6 text-cream-400" />,
              title: "Instant Analysis",
              desc: "Get quality predictions in milliseconds based on 11 chemical features."
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-wine-400" />,
              title: "ML Validated",
              desc: "Engineered using the UCI Wine Quality dataset and high-accuracy algorithms."
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-cream-400" />,
              title: "Visual Insights",
              desc: "Interactive charts visualize the impact of each feature on overall quality."
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-left border-white/5 hover:border-wine-500/20 transition-colors group">
              <div className="w-12 h-12 bg-charcoal-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-charcoal-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
