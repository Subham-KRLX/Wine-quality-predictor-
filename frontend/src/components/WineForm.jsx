import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const Tooltip = ({ text, children }) => (
    <div className="group relative inline-block">
        {children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-56 text-white text-xs rounded-lg p-3 z-20 shadow-xl bg-[#722F37] dark:bg-slate-700">
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#722F37] dark:border-t-slate-700"></div>
        </div>
    </div>
);

const InputField = ({ label, name, register, errors, tooltip, min, max, step, defaultValue, useSlider }) => {
    const [value, setValue] = React.useState(defaultValue);

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <label className="block text-sm font-medium text-[#722F37] dark:text-gray-200">{label}</label>
                    {tooltip && (
                        <Tooltip text={tooltip}>
                            <Info className="h-3.5 w-3.5 cursor-help hover:opacity-70 transition" style={{ color: '#881e3d' }} />
                        </Tooltip>
                    )}
                </div>
                {useSlider && <span className="text-xs font-mono text-[#881e3d] dark:text-gray-400">{value}</span>}
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
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#f7d1d7] dark:bg-slate-600 accent-[#722F37] dark:accent-amber-500"
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
                    className={`w-full px-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:outline-none transition-all bg-white dark:bg-slate-700 dark:text-white ${errors[name] ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 hover:border-gray-400 dark:border-slate-600'
                        } ${!errors[name] ? 'border-[#f7d1d7] dark:border-slate-600 focus:ring-[#722F37] dark:focus:ring-amber-500' : ''}`}
                />
            )}
            {errors[name] && <span className="text-xs text-red-500 mt-1 block">{errors[name].message}</span>}
        </div>
    );
};

const InputSection = ({ title, children, isOpen, toggle, theme = 'default' }) => {
    const themeStyles = {
        acidity: {
            bg: 'bg-gradient-to-r from-yellow-50 to-lime-50 dark:from-yellow-900/20 dark:to-lime-900/20',
            border: 'border-yellow-400 dark:border-yellow-600',
            text: 'text-yellow-700 dark:text-yellow-400',
            icon: 'text-yellow-600 dark:text-yellow-500'
        },
        sulfur: {
            bg: 'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20',
            border: 'border-cyan-400 dark:border-cyan-600',
            text: 'text-cyan-700 dark:text-cyan-400',
            icon: 'text-cyan-600 dark:text-cyan-500'
        },
        alcohol: {
            bg: 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
            border: 'border-purple-400 dark:border-purple-600',
            text: 'text-purple-700 dark:text-purple-400',
            icon: 'text-purple-600 dark:text-purple-500'
        },
        sugar: {
            bg: 'bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
            border: 'border-pink-400 dark:border-pink-600',
            text: 'text-pink-700 dark:text-pink-400',
            icon: 'text-pink-600 dark:text-pink-500'
        },
        default: {
            bg: '[background:linear-gradient(135deg,#fdf4f5_0%,#fef5e3_100%)] dark:bg-slate-800',
            border: 'border-[#f7d1d7] dark:border-slate-700',
            text: 'text-[#722F37] dark:text-white',
            icon: 'text-[#881e3d] dark:text-gray-400'
        }
    };

    const style = themeStyles[theme] || themeStyles.default;

    return (
        <div className={`bg-white dark:bg-slate-800 border-2 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all ${style.border}`}>
            <button
                type="button"
                onClick={toggle}
                className={`w-full px-5 py-4 hover:opacity-90 transition-all flex justify-between items-center ${style.bg}`}
            >
                <h3 className={`font-serif font-bold text-xl ${style.text}`}>{title}</h3>
                {isOpen ? <ChevronUp className={`h-5 w-5 ${style.icon}`} /> : <ChevronDown className={`h-5 w-5 ${style.icon}`} />}
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
};

const WineForm = ({ onSubmit, isLoading, wineType, setWineType }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
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

    React.useEffect(() => {
        setValue('type', wineType);
    }, [wineType, setValue]);

    const [sections, setSections] = React.useState({
        acidity: true,
        sulfur: false,
        alcohol: false,
        other: false
    });

    const toggleSection = (section) => {
        setSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Refs for wine buttons
    const redWineRef = useRef(null);
    const whiteWineRef = useRef(null);

    const handleWineHover = (ref, isEntering) => {
        if (isEntering) {
            gsap.to(ref.current, {
                scale: 1.08,
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(ref.current, {
                scale: wineType === (ref === redWineRef ? 0 : 1) ? 1.05 : 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    const handleWineClick = (ref) => {
        gsap.fromTo(ref.current,
            { scale: 0.95 },
            {
                scale: 1.05,
                duration: 0.4,
                ease: 'elastic.out(1, 0.3)'
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Wine Type Selector */}
            <div className="bg-white dark:bg-slate-800 border-2 rounded-xl p-5 shadow-sm border-[#f7d1d7] dark:border-slate-700">
                <label className="block text-sm font-medium mb-3 text-[#722F37] dark:text-gray-200">Wine Type</label>
                <div className="flex gap-3">
                    <button
                        ref={redWineRef}
                        type="button"
                        onClick={() => {
                            setWineType(0);
                            handleWineClick(redWineRef);
                        }}
                        onMouseEnter={() => handleWineHover(redWineRef, true)}
                        onMouseLeave={() => handleWineHover(redWineRef, false)}
                        className="flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 shadow-lg"
                        style={wineType === 0 ? {
                            backgroundColor: '#DC2626', // Bright Red
                            borderColor: '#F87171',
                            color: '#FFFFFF',
                            transform: 'scale(1.05)',
                            zIndex: 10,
                            boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)'
                        } : {
                            backgroundColor: 'transparent',
                            borderColor: '#334155',
                            color: '#94A3B8',
                            opacity: 0.6
                        }}
                    >
                        🍷 Red Wine
                    </button>
                    <button
                        ref={whiteWineRef}
                        type="button"
                        onClick={() => {
                            setWineType(1);
                            handleWineClick(whiteWineRef);
                        }}
                        onMouseEnter={() => handleWineHover(whiteWineRef, true)}
                        onMouseLeave={() => handleWineHover(whiteWineRef, false)}
                        className="flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 shadow-lg"
                        style={wineType === 0 ? {
                            backgroundColor: '#DC2626', // Bright Red
                            borderColor: '#F87171',
                            color: '#FFFFFF',
                            transform: 'scale(1.05)',
                            zIndex: 10,
                            boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)'
                        } : {
                            backgroundColor: 'transparent',
                            borderColor: '#334155',
                            color: '#94A3B8',
                            opacity: 0.6
                        }}
                    >
                        🍷 Red Wine
                    </button>
                    <button
                        type="button"
                        onClick={() => setWineType(1)}
                        className="flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 shadow-lg"
                        style={wineType === 1 ? {
                            backgroundColor: '#FBBF24', // Bright Amber
                            borderColor: '#FCD34D',
                            color: '#000000',
                            transform: 'scale(1.05)',
                            zIndex: 10,
                            boxShadow: '0 0 20px rgba(251, 191, 36, 0.6)'
                        } : {
                            backgroundColor: 'transparent',
                            borderColor: '#334155',
                            color: '#94A3B8',
                            opacity: 0.6
                        }}
                    >
                        🥂 White Wine
                    </button>
                </div>
                <input type="hidden" {...register("type")} value={wineType} />
            </div>

            {/* Acidity Section */}
            <InputSection title="🍋 Acidity & pH" isOpen={sections.acidity} toggle={() => toggleSection('acidity')} theme="acidity">
                <InputField label="Fixed Acidity" name="fixed acidity" register={register} errors={errors} min={4} max={16} defaultValue={7.4} tooltip="Primary acids in wine - tartaric, succinic, citric, and malic" />
                <InputField label="Volatile Acidity" name="volatile acidity" register={register} errors={errors} min={0.1} max={2} defaultValue={0.7} tooltip="Gaseous acids that can affect wine aroma" />
                <InputField label="Citric Acid" name="citric acid" register={register} errors={errors} min={0} max={1} defaultValue={0.0} tooltip="Adds freshness and flavor to wine" useSlider />
                <InputField label="pH Level" name="pH" register={register} errors={errors} min={2.5} max={4.5} defaultValue={3.51} tooltip="Measures wine's acidity level (lower = more acidic)" useSlider />
            </InputSection>

            {/* Sulfur Section */}
            <InputSection title="🧪 Sulfur Dioxide" isOpen={sections.sulfur} toggle={() => toggleSection('sulfur')} theme="sulfur">
                <InputField label="Free SO₂" name="free sulfur dioxide" register={register} errors={errors} min={1} max={72} defaultValue={11.0} tooltip="Prevents microbial growth and oxidation" />
                <InputField label="Total SO₂" name="total sulfur dioxide" register={register} errors={errors} min={6} max={300} defaultValue={34.0} tooltip="Total amount of free and bound sulfur dioxide" />
                <InputField label="Sulphates" name="sulphates" register={register} errors={errors} min={0.2} max={2} defaultValue={0.56} tooltip="Wine additive that contributes to SO₂ levels" useSlider />
            </InputSection>

            {/* Alcohol Section */}
            <InputSection title="🍾 Alcohol & Density" isOpen={sections.alcohol} toggle={() => toggleSection('alcohol')} theme="alcohol">
                <InputField label="Alcohol (%)" name="alcohol" register={register} errors={errors} min={8} max={15} defaultValue={9.4} tooltip="Percentage of alcohol content" useSlider />
                <InputField label="Density" name="density" register={register} errors={errors} min={0.99} max={1.01} step="0.0001" defaultValue={0.9978} tooltip="Density of wine relative to water" />
            </InputSection>

            {/* Other Section */}
            <InputSection title="🍬 Sugar & Minerals" isOpen={sections.other} toggle={() => toggleSection('other')} theme="sugar">
                <InputField label="Residual Sugar" name="residual sugar" register={register} errors={errors} min={0} max={20} defaultValue={1.9} tooltip="Sugar remaining after fermentation" useSlider />
                <InputField label="Chlorides" name="chlorides" register={register} errors={errors} min={0.01} max={0.6} defaultValue={0.076} tooltip="Amount of salt in the wine" />
            </InputSection>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full font-bold text-xl py-5 px-8 rounded-2xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-2xl border-2 animate-pulse"
                style={{
                    background: wineType === 0
                        ? 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)'
                        : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    borderColor: wineType === 0 ? '#FCA5A5' : '#FCD34D',
                    color: '#FFFFFF',
                    boxShadow: wineType === 0
                        ? '0 0 30px rgba(220, 38, 38, 0.7), 0 10px 25px rgba(0, 0, 0, 0.3)'
                        : '0 0 30px rgba(245, 158, 11, 0.7), 0 10px 25px rgba(0, 0, 0, 0.3)'
                }}
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
