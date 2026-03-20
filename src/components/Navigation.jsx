import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      anime({
        targets: menuRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg" style={{ background: 'rgba(10, 15, 20, 0.95)', borderBottom: '1px solid rgba(34, 197, 94, 0.1)' }}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent animate-glow">
            🏠 HomeValue
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {[
            { label: 'Features', target: '.form-container' },
            { label: 'Pricing', target: '.form-container' },
            { label: 'Analytics', target: '.analytics-container' },
            { label: 'Contact', target: '#footer' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 relative group bg-none border-none cursor-pointer font-normal"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <button onClick={() => {
          document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
        }} className="hidden md:block px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300">
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4"
        >
          {[
            { label: 'Features', target: '.form-container' },
            { label: 'Pricing', target: '.form-container' },
            { label: 'Analytics', target: '.analytics-container' },
            { label: 'Contact', target: '#footer' }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
              className="block w-full text-left py-2 text-slate-300 hover:text-blue-400 transition-colors bg-none border-none cursor-pointer font-normal"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
