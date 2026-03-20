import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import Results from './components/Results';
import Analytics from './components/Analytics';
import Footer from './components/Footer';

export default function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = (data) => {
    setPrediction(data);
    setTimeout(() => {
      document.querySelector('.results-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    try {
      anime.timeline()
        .add({
          targets: 'nav',
          opacity: [0, 1],
          translateY: [-20, 0],
          duration: 800,
          easing: 'easeOutQuad'
        }, 0)
        .add({
          targets: '.hero-section',
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 900,
          easing: 'easeOutQuad'
        }, 100)
        .add({
          targets: '.card',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuad',
          delay: anime.stagger(100)
        }, 200);

      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
            entry.target.classList.add('revealed');
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 700,
              easing: 'easeOutQuad'
            });
          }
        });
      }, observerOptions);

      document.querySelectorAll('[data-scroll-reveal]').forEach(el => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    } catch (error) {
      console.error('Animation error:', error);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{
      backgroundImage: 'url(/house-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Gradient overlay matching nature theme */}
      <div className="fixed inset-0 z-0" style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(20, 40, 30, 0.6) 50%, rgba(15, 23, 42, 0.5) 100%)'
      }}></div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        
        <main className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div data-scroll-reveal className="card form-container" style={{ background: 'rgba(10, 15, 20, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.15)', backdropFilter: 'blur(15px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <PredictionForm onPredict={handlePredict} />
            </div>
            <div data-scroll-reveal className="card results-container" style={{ background: 'rgba(10, 15, 20, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.15)', backdropFilter: 'blur(15px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
              <Results prediction={prediction} />
            </div>
          </div>

          <div data-scroll-reveal className="card analytics-container" style={{ background: 'rgba(10, 15, 20, 0.9)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.15)', backdropFilter: 'blur(15px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}>
            <Analytics />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
