import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Staggered text animation
    anime({
      targets: '.hero-text',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: anime.stagger(100)
    });

    // Button animation
    anime({
      targets: '.hero-buttons button',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuad',
      delay: anime.stagger(150, { start: 800 })
    });

    // Add hover effects
    const buttons = Array.from(document.querySelectorAll('.hero-buttons button'));
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        anime({
          targets: button,
          scale: 1.05,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });

      button.addEventListener('mouseleave', () => {
        anime({
          targets: button,
          scale: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
  }, []);

  return (
    <section className="hero-section pt-32 pb-20 relative overflow-hidden">
      <div
        ref={heroRef}
        className="container mx-auto px-4 text-center max-w-4xl"
      >
        <div className="mb-6 inline-block">
          <div className="hero-text flex items-center gap-2 px-4 py-2 bg-black/40 rounded-full border border-emerald-500/30 text-sm text-emerald-100 backdrop-blur-sm">
            <Sparkles size={16} className="text-emerald-400" />
            AI-Powered Real Estate Valuation
          </div>
        </div>

        <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent leading-tight">
          Discover Your Home's True Value
        </h1>

        <p className="hero-text text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Advanced machine learning algorithms analyze market trends, comparable properties, and location data to provide accurate property valuations in seconds.
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={() => {
            document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
          }} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-2 group">
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => {
            document.querySelector('.analytics-container')?.scrollIntoView({ behavior: 'smooth' });
          }} className="px-8 py-3 bg-black/50 text-emerald-100 font-semibold rounded-lg border border-emerald-500/30 hover:bg-black/70 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 text-center">
          {[
            { label: 'Properties Analyzed', value: '50K+' },
            { label: 'Accuracy Rate', value: '94%' },
            { label: 'Cities Covered', value: '200+' }
          ].map((stat, i) => (
            <div
              key={i}
              className="hero-text"
              style={{ 
                opacity: 0,
                transform: 'translateY(40px)'
              }}
            >
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
