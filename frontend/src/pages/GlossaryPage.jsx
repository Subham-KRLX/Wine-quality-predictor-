import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Droplets, Thermometer, Wind, Zap } from 'lucide-react';

const glossaryData = [
  {
    category: "Acidity & Ions",
    icon: <FlaskConical className="w-6 h-6 text-wine-400" />,
    items: [
      {
        name: "Fixed Acidity",
        desc: "Non-volatile acids that do not evaporate readily. They are fundamental to the wine's structure and aging potential."
      },
      {
        name: "Volatile Acidity",
        desc: "The amount of acetic acid in wine, which at too high of levels can lead to an unpleasant, vinegar taste."
      },
      {
        name: "Citric Acid",
        desc: "Found in small quantities, citric acid can add 'freshness' and flavor to wines."
      },
      {
        name: "pH",
        desc: "Describes how acidic or basic a wine is on a scale from 0 (very acidic) to 14 (very basic); most wines are between 3-4."
      },
      {
        name: "Chlorides",
        desc: "The amount of salt in the wine. It can affect the perception of 'saltiness' and body."
      }
    ]
  },
  {
    category: "Preservatives",
    icon: <Wind className="w-6 h-6 text-blue-400" />,
    items: [
      {
        name: "Free Sulfur Dioxide",
        desc: "The free form of SO2 exists in equilibrium between molecular SO2 and bisulfite ion; it prevents microbial growth and oxidation."
      },
      {
        name: "Total Sulfur Dioxide",
        desc: "The sum of the free and bound forms of SO2. High concentrations can become evident in the nose and taste of wine."
      },
      {
        name: "Sulphates",
        desc: "A wine additive which can contribute to sulfur dioxide gas (S02) levels, which acts as an antimicrobial and antioxidant."
      }
    ]
  },
  {
    category: "Texture & Composition",
    icon: <Droplets className="w-6 h-6 text-cream-400" />,
    items: [
      {
        name: "Residual Sugar",
        desc: "The amount of sugar remaining after fermentation stops, it's rare to find wines with less than 1 gram/liter."
      },
      {
        name: "Density",
        desc: "The density of water is close to that of water depending on the percent alcohol and sugar content."
      },
      {
        name: "Alcohol",
        desc: "The percent alcohol content of the wine. High alcohol content contributes to the body and 'warmth' of the wine."
      }
    ]
  }
];

const GlossaryPage = () => {
  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Chemical <span className="text-wine-500">Glossary</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-charcoal-400 max-w-2xl mx-auto"
          >
            Understand the physicochemical markers that our AI uses to determine the quality and character of every wine sample.
          </motion.p>
        </div>

        <div className="space-y-16">
          {glossaryData.map((group, groupIdx) => (
            <section key={groupIdx}>
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                {group.icon}
                <h2 className="text-2xl font-bold">{group.category}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIdx * 0.05 }}
                    className="p-6 rounded-2xl glass-card border-white/5 hover:border-wine-500/30 transition-colors group"
                  >
                    <h3 className="text-lg font-bold mb-3 text-wine-400 group-hover:text-wine-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-charcoal-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-3xl bg-charcoal-900/80 border border-wine-500/20 text-center"
        >
          <h3 className="text-xl font-bold mb-4 italic">Ready to see the science in action?</h3>
          <p className="text-charcoal-400 mb-8 max-w-lg mx-auto">
            Our model uses these exact parameters to calculate a professional-grade quality score in milliseconds.
          </p>
          <a
            href="/predict"
            className="inline-block px-8 py-4 bg-wine-700 hover:bg-wine-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-wine-900/20"
          >
            Start Analyzing
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default GlossaryPage;
