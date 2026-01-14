import React, { useEffect } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ finishLoading }) {
  useEffect(() => {
    // Duration matches the CSS animations (fill + text reveals)
    const timer = setTimeout(() => {
      finishLoading();
    }, 3500);

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="splash-container">
      {/* Decorative Side Glow Lines */}
      <div className="side-glow left" />
      <div className="side-glow right" />

      <div className="glass-wrapper">
        <div className="glass-container">
          {/* Particles & Sparkles - Expanded for "Swarm" effect */}
          <div className="particles-container">
            {[...Array(12)].map((_, i) => (
              <div key={`p-${i}`} className={`particle particle-${i % 6}`} />
            ))}
            {[...Array(8)].map((_, i) => (
              <div key={`s-${i}`} className={`sparkle sparkle-${i % 4}`} />
            ))}
          </div>

          {/* Stem & Base */}
          <div className="glass-stem" />
          <div className="glass-base" />

          {/* Curved Bowl */}
          <div className="glass-bowl">
            <svg viewBox="0 0 100 120" className="glass-svg">
              <defs>
                <clipPath id="wine-clip">
                  <path d="M5,0 C5,130 95,130 95,0 Z" />
                </clipPath>
                <linearGradient id="wine-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#4D0505" />
                  <stop offset="50%" stopColor="#800020" />
                  <stop offset="100%" stopColor="#B22222" />
                </linearGradient>
              </defs>

              {/* Glass Outline */}
              <path
                d="M5,0 C5,130 95,130 95,0"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
              />

              {/* Animated Wine Fill */}
              <g clipPath="url(#wine-clip)">
                <rect className="wine-fill-rect" x="0" y="120" width="100" height="120" fill="url(#wine-grad)" />
              </g>

              {/* Surface Highlight/Shimmer */}
              <line className="wine-surface" x1="10" y1="0" x2="90" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      <h1 className="title">Wine Quality Predictor</h1>
      <p className="subtitle">Machine Learning Meets Taste</p>
    </div>
  );
}
