import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import PredictPage from './pages/PredictPage';

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/predict" element={<PredictPage />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;
