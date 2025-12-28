import React from 'react';
import { useForm } from 'react-hook-form';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Tooltip = ({ text, children }) => (
    <div className="group relative inline-block">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 text-white text-xs rounded-lg p-3 z-20 shadow-xl" style={{ backgroundColor: '#722F37' }}>
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: '#722F37' }}></div>
        </div>
    </div>
);

const InputField = ({ label, name, register, errors, tooltip, min, max, step, defaultValue, useSlider }) => {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium" style={{ color: '#722F37' }}>{label}</label>
                    {tooltip && (
                        <Tooltip text={tooltip}>
                            <Info className="h-3.5 w-3.5 cursor-help hover:opacity-70 transition" style={{ color: '#881e3d' }} />
                        </Tooltip>
                    )}
                </div>
                {useSlider && <span className="text-xs font-mono" style={{ color: '#881e3d' }}>{value}</span>}
            </div>

            {useSlider ? (
                <div className="space-y-2">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step || "0.01"}
                        value={value}
                        onChange={(e) => setValue(parseFloat(e.target.value))}
                        {...register(name, {
                            required: "Required",
                            min: { value: min, message: `Min ${min}` },
                            max: { value: max, message: `Max ${max}` },
                            valueAsNumber: true
                        })}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{ backgroundColor: '#f7d1d7', accentColor: '#722F37' }}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{min}</span>
                        <span>{max}</span>
                    </div>
                </div>
            ) : (
                <input
                    type="number"
                    step={step || "0.01"}
                    defaultValue={defaultValue}
                    {...register(name, {
                        required: "Required",
                        min: { value: min, message: `Min ${min}` },
                        max: { value: max, message: `Max ${max}` }
                    })}
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all bg-white ${errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                    style={!errors[name] ? { borderColor: '#f7d1d7', focusRingColor: '#722F37' } : {}}
                />
            )}
            {errors[name] && <span className="text-xs text-red-500 mt-1 block">{errors[name].message}</span>}
        </div>
    );
};

const InputSection = ({ title, children, isOpen, toggle }) => (
    <div className="bg-white border-2 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: '#f7d1d7' }}>
        <button
            type="button"
            onClick={toggle}
            className="w-full px-5 py-4 hover:opacity-90 transition-all flex justify-between items-center"
            style={{ background: 'linear-gradient(135deg, #fdf4f5 0%, #fef5e3 100%)' }}
        >
            <h3 className="font-serif font-semibold text-lg" style={{ color: '#722F37' }}>{title}</h3>
            {isOpen ? <ChevronUp className="h-5 w-5" style={{ color: '#881e3d' }} /> : <ChevronDown className="h-5 w-5" style={{ color: '#881e3d' }} />}
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const WineForm = ({ onSubmit, isLoading, wineType, setWineType }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            "fixed acidity": 7.4,
            "volatile acidity": 0.7,
            "citric acid": 0.0,
            "residual sugar": 1.9,
            "chlorides": 0.076,
            "free sulfur dioxide": 11.0,
            "total sulfur dioxide": 34.0,
            "density": 0.9978,
            "pH": 3.51,
            "sulphates": 0.56,
            "alcohol": 9.4,
            "type": 0
        }
    });

    const [sections, setSections] = React.useState({
        acidity: true,
        sulfur: false,
        alcohol: false,
        other: false
    });

    const toggleSection = (section) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Wine Type Selector */}
            <div className="bg-white border-2 rounded-xl p-5 shadow-sm" style={{ borderColor: '#f7d1d7' }}>
                <label className="block text-sm font-medium mb-3" style={{ color: '#722F37' }}>Wine Type</label>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => setWineType(0)}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${wineType === 0 ? 'text-white shadow-md' : 'hover:opacity-80'
                            }`}
                        style={
                            wineType === 0
                                ? { background: 'linear-gradient(135deg, #722F37 0%, #881e3d 100%)' }
                                : { backgroundColor: '#fdf4f5', color: '#722F37' }
                        }
                    >
                        🍷 Red Wine
                    </button>
                    <button
                        type="button"
                        onClick={() => setWineType(1)}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${wineType === 1 ? 'text-white shadow-md' : 'hover:opacity-80'
                            }`}
                        style={
                            wineType === 1
                                ? { background: 'linear-gradient(135deg, #f1a64b 0%, #e28a2f 100%)' }
                                : { backgroundColor: '#fef5e3', color: '#bd6f25' }
                        }
                    >
                        🥂 White Wine
                    </button>
                </div>
                <input type="hidden" {...register("type")} value={wineType} />
            </div>

            {/* Acidity Section */}
            <InputSection title="🍋 Acidity & pH" isOpen={sections.acidity} toggle={() => toggleSection('acidity')}>
                <InputField label="Fixed Acidity" name="fixed acidity" register={register} errors={errors} min={4} max={16} defaultValue={7.4} tooltip="Primary acids in wine - tartaric, succinic, citric, and malic" />
                <InputField label="Volatile Acidity" name="volatile acidity" register={register} errors={errors} min={0.1} max={2} defaultValue={0.7} tooltip="Gaseous acids that can affect wine aroma" />
                <InputField label="Citric Acid" name="citric acid" register={register} errors={errors} min={0} max={1} defaultValue={0.0} tooltip="Adds freshness and flavor to wine" useSlider />
                <InputField label="pH Level" name="pH" register={register} errors={errors} min={2.5} max={4.5} defaultValue={3.51} tooltip="Measures wine's acidity level (lower = more acidic)" useSlider />
            </InputSection>

            {/* Sulfur Section */}
            <InputSection title="🧪 Sulfur Dioxide" isOpen={sections.sulfur} toggle={() => toggleSection('sulfur')}>
                <InputField label="Free SO₂" name="free sulfur dioxide" register={register} errors={errors} min={1} max={72} defaultValue={11.0} tooltip="Prevents microbial growth and oxidation" />
                <InputField label="Total SO₂" name="total sulfur dioxide" register={register} errors={errors} min={6} max={300} defaultValue={34.0} tooltip="Total amount of free and bound sulfur dioxide" />
                <InputField label="Sulphates" name="sulphates" register={register} errors={errors} min={0.2} max={2} defaultValue={0.56} tooltip="Wine additive that contributes to SO₂ levels" useSlider />
            </InputSection>

            {/* Alcohol Section */}
            <InputSection title="🍾 Alcohol & Density" isOpen={sections.alcohol} toggle={() => toggleSection('alcohol')}>
                <InputField label="Alcohol (%)" name="alcohol" register={register} errors={errors} min={8} max={15} defaultValue={9.4} tooltip="Percentage of alcohol content" useSlider />
                <InputField label="Density" name="density" register={register} errors={errors} min={0.99} max={1.01} step="0.0001" defaultValue={0.9978} tooltip="Density of wine relative to water" />
            </InputSection>

            {/* Other Section */}
            <InputSection title="🍬 Sugar & Minerals" isOpen={sections.other} toggle={() => toggleSection('other')}>
                <InputField label="Residual Sugar" name="residual sugar" register={register} errors={errors} min={0} max={20} defaultValue={1.9} tooltip="Sugar remaining after fermentation" useSlider />
                <InputField label="Chlorides" name="chlorides" register={register} errors={errors} min={0.01} max={0.6} defaultValue={0.076} tooltip="Amount of salt in the wine" />
            </InputSection>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-lg text-white"
                style={
                    wineType === 0
                        ? { background: 'linear-gradient(135deg, #722F37 0%, #881e3d 100%)' }
                        : { background: 'linear-gradient(135deg, #f1a64b 0%, #e28a2f 100%)' }
                }
            >
                {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                    "🔮 Predict Quality"
                )}
            </button>
        </form>
    );
};

export default WineForm;
