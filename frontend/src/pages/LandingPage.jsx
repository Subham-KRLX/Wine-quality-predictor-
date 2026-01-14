import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import ModelExplanation from '../components/sections/ModelExplanation';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <Hero onGetStarted={() => navigate('/predict')} />
      <ModelExplanation />

      {/* Featured Quote Section */}
      <section className="py-24 px-4 bg-charcoal-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-wine-500/50 to-transparent" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif italic text-white/90 mb-8 leading-relaxed">
            "Wine is one of the most civilized things in the world and one of the most natural things of the world that has been brought to the greatest perfection."
          </h2>
          <p className="text-wine-400 font-medium tracking-widest uppercase text-sm">
            — Ernest Hemingway
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
