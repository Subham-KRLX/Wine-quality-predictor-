import React from 'react';
import { Wine, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-charcoal-950 border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Wine className="text-wine-500 w-8 h-8" />
            <span className="text-2xl font-bold text-white tracking-tight">VinoPredict</span>
          </div>
          <p className="text-charcoal-400 max-w-sm mb-6 leading-relaxed">
            Revolutionizing the way we understand wine quality through the power of artificial intelligence and chemical analysis.
          </p>
          <div className="flex gap-4">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-wine-900/40 hover:text-wine-400 transition-all border border-white/5"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 italic">Navigation</h4>
          <ul className="space-y-4 text-charcoal-400 text-sm">
            <li><a href="/" className="hover:text-wine-400">Home</a></li>
            <li><a href="/predict" className="hover:text-wine-400">Predict Quality</a></li>
            <li><a href="#how-it-works" className="hover:text-wine-400">Our Model</a></li>
            <li><a href="/analysis" className="hover:text-wine-400">Chemical Glossary</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 italic">Tech Stack</h4>
          <ul className="space-y-4 text-charcoal-400 text-sm">
            <li>React 18 & Vite</li>
            <li>Tailwind CSS</li>
            <li>Framer Motion</li>
            <li>FastAPI & Python</li>
            <li>Scikit-Learn</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-charcoal-500">
        <p>© 2024 VinoPredict. Developed with precision and passion.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-4 h-4 text-wine-500 fill-wine-500" /> by <span className="text-charcoal-300 font-medium">NssGourav</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
