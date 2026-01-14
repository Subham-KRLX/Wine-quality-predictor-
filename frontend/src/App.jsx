import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import PredictPage from './pages/PredictPage';
import GlossaryPage from './pages/GlossaryPage';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/predict" element={<PredictPage />} />
                    <Route path="/glossary" element={<GlossaryPage />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
