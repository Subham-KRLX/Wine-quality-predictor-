import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WineForm from './components/WineForm';
import PredictionResult from './components/PredictionResult';
import FeatureImportanceChart from './components/FeatureImportanceChart';
import useTheme from './hooks/useTheme';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Sparkles, Info, Wine, Home } from 'lucide-react';

function PredictPage() {
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [wineType, setWineType] = useState(0);
    const [alcoholLevel, setAlcoholLevel] = useState(9.4);
    const navigate = useNavigate();

    const handlePredict = async (data) => {
        setIsLoading(true);
        setError(null);
        setPrediction(null);
        setAlcoholLevel(parseFloat(data.alcohol));

        try {
            const numericData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [key, parseFloat(value)])
            );

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(numericData),
            });

            if (!response.ok) {
                throw new Error('Failed to get prediction');
            }

            const result = await response.json();
            setPrediction(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen dark:bg-slate-950 [background:linear-gradient(135deg,#F5F5F5_0%,#FAFAFA_100%)]">
            {/* Header with wine gradient */}
            <div className="shadow-lg border-b-2 dark:border-slate-700 border-amber-400/30 sticky top-0 z-50 backdrop-blur-sm dark:bg-slate-900" style={{ background: 'linear-gradient(135deg, #722F37 0%, #f1a64b 100%)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 dark:text-gray-300 dark:hover:text-amber-400 text-white hover:text-amber-200 font-medium transition-colors group"
                        >
                            <Home className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <Wine className="h-6 w-6 text-amber-300" />
                            <h1 className="text-xl font-serif font-bold text-white">VinoPredict</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <TabGroup>
                    <TabList className="flex gap-3 p-2 dark:bg-slate-800 dark:border-slate-700 bg-white rounded-2xl shadow-xl border-2 border-wine-100 mb-10 max-w-md mx-auto">
                        <Tab className="flex-1 py-3.5 px-5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 outline-none dark:text-gray-300 text-wine-700 dark:hover:bg-slate-700 hover:bg-cream-100 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:bg-[linear-gradient(135deg,#722F37_0%,#f1a64b_100%)]">
                            <Sparkles className="h-4 w-4" />
                            <span>Predict</span>
                        </Tab>
                        <Tab className="flex-1 py-3.5 px-5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 outline-none dark:text-gray-300 text-wine-700 dark:hover:bg-slate-700 hover:bg-cream-100 data-[selected]:text-white data-[selected]:shadow-lg data-[selected]:bg-[linear-gradient(135deg,#722F37_0%,#f1a64b_100%)]">
                            <Info className="h-4 w-4" />
                            <span>About</span>
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <div className="dark:bg-slate-800 dark:border-slate-700 bg-white/70 backdrop-blur-sm rounded-3xl p-10 mb-8 border-2 border-wine-100 shadow-2xl">
                                        <h2 className="text-5xl dark:text-white font-serif font-bold text-wine-900 mb-4">
                                            Wine Quality Analysis
                                        </h2>
                                        <p className="dark:text-gray-300 text-gray-700 text-lg leading-relaxed">
                                            Enter your wine's chemical composition to receive AI-powered quality predictions
                                        </p>
                                    </div>
                                    <WineForm onSubmit={handlePredict} isLoading={isLoading} wineType={wineType} setWineType={setWineType} />
                                </div>

                                <div className="lg:col-span-1 space-y-6">
                                    {error && (
                                        <div className="dark:bg-red-950 dark:text-red-300 dark:border-red-800 bg-red-50 text-red-700 p-5 rounded-2xl border-2 border-red-200 shadow-sm">
                                            <p className="font-semibold text-base">Error</p>
                                            <p className="text-sm mt-1">{error}</p>
                                        </div>
                                    )}

                                    <PredictionResult result={prediction} wineType={wineType} alcoholLevel={alcoholLevel} />

                                    {prediction && <FeatureImportanceChart wineType={wineType} />}

                                    <div className={`p-6 rounded-2xl dark:border-slate-700 dark:bg-slate-800 border-2 ${wineType === 0 ? 'border-wine-200 bg-white shadow-lg' : 'border-amber-200 bg-white shadow-lg'}`}>
                                        <div className="flex items-start gap-3">
                                            <Wine className={`h-6 w-6 ${wineType === 0 ? 'text-wine-600' : 'text-amber-600'} flex-shrink-0 mt-0.5`} />
                                            <div>
                                                <h4 className={`font-serif font-bold dark:text-white mb-2 ${wineType === 0 ? 'text-wine-900' : 'text-amber-900'}`}>
                                                    Pro Tip
                                                </h4>
                                                <p className="dark:text-gray-300 text-sm text-gray-700 leading-relaxed">
                                                    Higher alcohol content and balanced acidity typically indicate premium wine quality.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="max-w-4xl mx-auto">
                                <div className="dark:bg-slate-800 dark:border-slate-700 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-wine-100 p-12">
                                    <h2 className="text-5xl dark:text-white font-serif font-bold text-wine-900 mb-10">
                                        About VinoPredict
                                    </h2>

                                    <div className="prose prose-wine max-w-none space-y-10">
                                        <section>
                                            <h3 className="text-3xl dark:text-white font-serif font-semibold text-wine-900 mb-5">How It Works</h3>
                                            <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-lg">
                                                VinoPredict uses advanced Random Forest machine learning to analyze 12 physicochemical properties
                                                and predict wine quality scores with 43.4% R² accuracy.
                                            </p>
                                        </section>

                                        <section className="dark:bg-slate-700 dark:border-slate-600 bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
                                            <h3 className="text-3xl dark:text-white font-serif font-semibold text-wine-900 mb-5">Key Parameters</h3>
                                            <dl className="space-y-4">
                                                {[
                                                    { term: 'Fixed Acidity', def: 'Tartaric, malic, and citric acids providing wine structure' },
                                                    { term: 'Volatile Acidity', def: 'Acetic acid levels affecting aroma and taste' },
                                                    { term: 'Residual Sugar', def: 'Natural grape sugars remaining after fermentation' },
                                                    { term: 'Alcohol Content', def: 'Ethanol percentage determining body and warmth' },
                                                    { term: 'pH Level', def: 'Acidity measurement influencing taste and stability' }
                                                ].map((item, index) => (
                                                    <div key={index} className="dark:border-amber-500 border-l-4 border-wine-500 pl-5">
                                                        <dt className="dark:text-white font-bold text-wine-900 text-lg mb-1">{item.term}</dt>
                                                        <dd className="dark:text-gray-300 text-gray-700 text-base leading-relaxed">{item.def}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
}

const HomePageWrapper = () => {
    const navigate = useNavigate();
    return <HomePage onGetStarted={() => navigate('/predict')} />;
};

function App() {


    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePageWrapper />} />
                    <Route path="/predict" element={<PredictPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
