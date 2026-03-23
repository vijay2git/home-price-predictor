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
      type: 'select',
      options: [
        { value: 500, label: '500 sq ft' },
        { value: 1000, label: '1,000 sq ft' },
        { value: 1500, label: '1,500 sq ft' },
        { value: 2000, label: '2,000 sq ft' },
        { value: 2500, label: '2,500 sq ft' },
        { value: 3000, label: '3,000 sq ft' },
        { value: 3500, label: '3,500 sq ft' },
        { value: 4000, label: '4,000 sq ft' },
        { value: 4500, label: '4,500 sq ft' },
        { value: 5000, label: '5,000 sq ft' },
        { value: 5500, label: '5,500 sq ft' },
        { value: 6000, label: '6,000 sq ft' },
        { value: 7000, label: '7,000 sq ft' },
        { value: 8000, label: '8,000 sq ft' },
        { value: 9000, label: '9,000 sq ft' },
        { value: 10000, label: '10,000 sq ft' }
      ],
      icon: Home
    },
    {
      label: 'Bedrooms',
      name: 'bedrooms',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' }
      ],
      icon: Home
    },
    {
      label: 'Bathrooms',
      name: 'bathrooms',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' }
      ],
      icon: Home
    },
    {
      label: 'Year Built',
      name: 'yearBuilt',
      type: 'select',
      options: [
        { value: 2024, label: '2024' },
        { value: 2019, label: '2019' },
        { value: 2014, label: '2014' },
        { value: 2009, label: '2009' },
        { value: 2004, label: '2004' },
        { value: 1999, label: '1999' },
        { value: 1994, label: '1994' },
        { value: 1989, label: '1989' },
        { value: 1984, label: '1984' },
        { value: 1979, label: '1979' },
        { value: 1974, label: '1974' },
        { value: 1969, label: '1969' },
        { value: 1964, label: '1964' },
        { value: 1959, label: '1959' },
        { value: 1954, label: '1954' },
        { value: 1950, label: '1950' }
      ],
      icon: Home
    },
    {
      label: 'Garage',
      name: 'garage',
      type: 'select',
      options: [
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' }
      ],
      icon: Home
    },
    {
      label: 'Location',
      name: 'location',
      type: 'select',
      options: [
        { value: 'Mumbai, India', label: 'Mumbai' },
        { value: 'Delhi, India', label: 'Delhi' },
        { value: 'Bangalore, India', label: 'Bangalore' },
        { value: 'Hyderabad, India', label: 'Hyderabad' },
        { value: 'Chennai, India', label: 'Chennai' },
        { value: 'Pune, India', label: 'Pune' },
        { value: 'Kolkata, India', label: 'Kolkata' },
        { value: 'Gurgaon, India', label: 'Gurgaon' },
        { value: 'Noida, India', label: 'Noida' },
        { value: 'Ahmedabad, India', label: 'Ahmedabad' },
        { value: 'Jaipur, India', label: 'Jaipur' },
        { value: 'Lucknow, India', label: 'Lucknow' }
      ],
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
        {formGroups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Icon size={16} className="text-emerald-400" />
                {group.label}
              </label>
              {group.type === 'select' ? (
                <select
                  name={group.name}
                  value={formData[group.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : group.type === 'range' ? (
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
