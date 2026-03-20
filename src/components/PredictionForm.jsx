import React, { useState, useRef } from 'react';
import anime from 'animejs';
import { Home, MapPin, DollarSign, Loader } from 'lucide-react';

export default function PredictionForm({ onPredict }) {
  const [formData, setFormData] = useState({
    squareFeet: 2500,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2015,
    garage: 2,
    location: 'Mumbai, India'
  });

  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Animate submit
    anime({
      targets: 'button[type="submit"]',
      scale: [1, 0.95, 1],
      duration: 600,
      easing: 'easeInOutQuad'
    });

    try {
      console.log('Sending prediction request with data:', formData);
      
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(`Prediction failed: ${errorData.error || response.statusText}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Prediction result:', data);
      
      if (onPredict) onPredict(data);

      // Success animation
      anime({
        targets: formRef.current,
        scale: [0.98, 1],
        duration: 400,
        easing: 'easeOutQuad'
      });
    } catch (error) {
      console.error('Prediction error:', error);
      alert(`Error: ${error.message}. Make sure the backend is running on localhost:5000`);
    } finally {
      setLoading(false);
    }
  };

  const formGroups = [
    {
      label: 'Square Feet',
      name: 'squareFeet',
      type: 'range',
      min: 500,
      max: 10000,
      icon: Home
    },
    {
      label: 'Bedrooms',
      name: 'bedrooms',
      type: 'number',
      min: 1,
      max: 10,
      icon: Home
    },
    {
      label: 'Bathrooms',
      name: 'bathrooms',
      type: 'number',
      min: 1,
      max: 10,
      icon: Home
    },
    {
      label: 'Year Built',
      name: 'yearBuilt',
      type: 'number',
      min: 1950,
      max: 2024,
      icon: Home
    },
    {
      label: 'Garage',
      name: 'garage',
      type: 'number',
      min: 0,
      max: 5,
      icon: Home
    },
    {
      label: 'Location',
      name: 'location',
      type: 'text',
      icon: MapPin
    }
  ];

  return (
    <div ref={formRef} className="rounded-xl p-6" style={{ background: 'rgba(10, 15, 20, 0.7)', border: '1px solid rgba(34, 197, 94, 0.15)' }}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <DollarSign className="text-emerald-400" size={28} />
        Property Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formGroups.filter(group => group.name !== 'location').map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Icon size={16} className="text-emerald-400" />
                {group.label}
              </label>
              {group.type === 'range' ? (
                <div>
                  <input
                    type="range"
                    name={group.name}
                    value={formData[group.name]}
                    onChange={handleChange}
                    min={group.min}
                    max={group.max}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="text-sm text-slate-400 mt-1">
                    {formData[group.name].toLocaleString()} sq ft
                  </div>
                </div>
              ) : (
                <input
                  type={group.type}
                  name={group.name}
                  value={formData[group.name]}
                  onChange={handleChange}
                  min={group.min}
                  max={group.max}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              )}
            </div>
          );
        })}

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <MapPin size={16} className="text-emerald-400" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader size={20} className="animate-spin" />
              Predicting...
            </>
          ) : (
            'Get Prediction'
          )}
        </button>
      </form>
    </div>
  );
}
