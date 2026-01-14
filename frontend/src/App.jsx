import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import PredictPage from './pages/PredictPage';
import GlossaryPage from './pages/GlossaryPage';
import SplashScreen from './components/ui/SplashScreen';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const [isSplashVisible, setIsSplashVisible] = React.useState(true);

    const handleSplashFinish = () => {
        setIsSplashVisible(false);
    };


    return (
        <Router>
            <AnimatePresence mode="wait">
                {isSplashVisible && (
                    <SplashScreen key="splash" finishLoading={handleSplashFinish} />
                )}
                {!isSplashVisible && (
                    <motion.div
                        key="main-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/predict" element={<PredictPage />} />
                                <Route path="/glossary" element={<GlossaryPage />} />
                            </Routes>
                        </MainLayout>
                    </motion.div>
                )}
            </AnimatePresence>
        </Router>
    );
}

export default App;
