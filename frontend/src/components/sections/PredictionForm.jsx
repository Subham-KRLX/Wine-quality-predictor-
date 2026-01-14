import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Beaker, Sparkles, Loader2, Wine as WineIcon } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

const fieldGroups = [
  {
    title: "Acidity & pH",
    fields: [
      { name: "fixed_acidity", label: "Fixed Acidity", tooltip: "Acids that don't evaporate easily, contributing to wine structure.", placeholder: "e.g. 7.4" },
      { name: "volatile_acidity", label: "Volatile Acidity", tooltip: "Acetic acid levels; high levels lead to an unpleasant vinegar taste.", placeholder: "e.g. 0.7" },
      { name: "citric_acid", label: "Citric Acid", tooltip: "Adds freshness and flavor to wines.", placeholder: "e.g. 0.0" },
      { name: "pH", label: "pH Level", tooltip: "Balance of acidity and alkalinity (0=acidic, 14=basic).", placeholder: "e.g. 3.51" },
    ]
  },
  {
    title: "Sugar & Body",
    fields: [
      { name: "residual_sugar", label: "Residual Sugar", tooltip: "Amount of sugar remaining after fermentation finishes.", placeholder: "e.g. 1.9" },
      { name: "density", label: "Density", tooltip: "Weight of the wine compared to water.", placeholder: "e.g. 0.9978" },
      { name: "alcohol", label: "Alcohol", tooltip: "The percentage of alcohol content.", placeholder: "e.g. 9.4" },
    ]
  },
  {
    title: "Chemical Signatures",
    fields: [
      { name: "chlorides", label: "Chlorides", tooltip: "Amount of salt in the wine.", placeholder: "e.g. 0.076" },
      { name: "free_sulfur_dioxide", label: "Free SO2", tooltip: "Prevents microbial growth and oxidation.", placeholder: "e.g. 11.0" },
      { name: "total_sulfur_dioxide", label: "Total SO2", tooltip: "Portion of SO2 that is free in the wine.", placeholder: "e.g. 34.0" },
      { name: "sulphates", label: "Sulphates", tooltip: "Additive which acts as an antimicrobial and antioxidant.", placeholder: "e.g. 0.56" },
    ]
  }
];

const PredictionForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      type: 0,
      fixed_acidity: 7.4,
      volatile_acidity: 0.7,
      citric_acid: 0,
      residual_sugar: 1.9,
      chlorides: 0.076,
      free_sulfur_dioxide: 11,
      total_sulfur_dioxide: 34,
      density: 0.9978,
      pH: 3.51,
      sulphates: 0.56,
      alcohol: 9.4
    }
  });

  const wineType = watch('type');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Type Selector */}
        <div className="glass-card p-4 rounded-2xl flex items-center justify-center gap-4 border-white/5">
          <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer transition-all ${wineType == 0 ? 'bg-wine-900 text-white shadow-lg shadow-wine-900/40' : 'hover:bg-white/5'}`}>
            <input type="radio" value={0} {...register('type', { valueAsNumber: true })} className="hidden" />
            <WineIcon className="w-5 h-5" />
            <span className="font-bold">Red Wine</span>
          </label>
          <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer transition-all ${wineType == 1 ? 'bg-cream-600 text-white shadow-lg shadow-cream-900/40' : 'hover:bg-white/5'}`}>
            <input type="radio" value={1} {...register('type', { valueAsNumber: true })} className="hidden" />
            <WineIcon className="w-5 h-5" />
            <span className="font-bold">White Wine</span>
          </label>
        </div>

        {/* Input Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fieldGroups.map((group, i) => (
            <div key={i} className={`p-8 rounded-3xl glass-card border-white/5 ${i === 2 ? 'md:col-span-2' : ''}`}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-wine-400" />
                {group.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {group.fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-charcoal-400">
                        {field.label}
                      </label>
                      <Tooltip text={field.tooltip} />
                    </div>
                    <input
                      type="number"
                      step="any"
                      {...register(field.name, {
                        required: true,
                        valueAsNumber: true,
                        validate: v => Number.isFinite(v) || "Please enter a valid number"
                      })}
                      placeholder={field.placeholder}
                      className="w-full bg-charcoal-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-wine-500/50 focus:border-wine-500 transition-all outline-none"
                    />
                    {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name].message || "Required"}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-wine-700 hover:bg-wine-600 disabled:bg-charcoal-800 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-wine-900/20 flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Analyze Quality
              <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default PredictionForm;
