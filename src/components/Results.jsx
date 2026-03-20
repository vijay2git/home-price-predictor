import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { TrendingUp, Shield, Zap } from 'lucide-react';

// Helper function to format number with Indian comma separation
const formatIndianNumber = (num) => {
  // Convert to number if it's not already
  const n = Number(num);
  
  // Handle negative numbers
  if (n < 0) return `-${formatIndianNumber(Math.abs(n))}`;
  
  // If less than 1000, show as is
  if (n < 1000) {
    return n.toFixed(0);
  }
  
  // Convert to string
  const str = n.toFixed(0);
  let result = '';
  
  // Handle the last three digits
  result = str.slice(Math.max(0, str.length - 3));
  
  // Handle the remaining digits in groups of 2 from right
  for (let i = Math.max(0, str.length - 3); i > 0; i -= 2) {
    const start = Math.max(0, i - 2);
    result = str.slice(start, i) + ',' + result;
  }
  
  return result;
};

// Helper function to format number in Indian currency system
const formatIndianCurrency = (amount) => {
  // Convert to number if it's not already
  const num = Number(amount);
  
  // Handle negative numbers
  if (num < 0) return `-${formatIndianCurrency(Math.abs(num))}`;
  
  // Return formatted number with ₹ symbol
  return `₹${formatIndianNumber(num)}`;
};

export default function Results({ children, ...props }) {
  // Check if prediction is passed as prop or through context
  const [prediction, setPrediction] = useState(null);
  const resultsRef = useRef(null);

  // Get prediction from parent via children prop (React pattern)
  useEffect(() => {
    // This component receives prediction data via parent state
    // Check if there's prediction data in props
    if (props.prediction) {
      setPrediction(props.prediction);
    }
  }, [props.prediction]);

  useEffect(() => {
    if (prediction && resultsRef.current) {
      // Animate result reveal
      anime.timeline()
        .add({
          targets: resultsRef.current,
          opacity: [0.5, 1],
          scale: [0.95, 1],
          duration: 600,
          easing: 'easeOutQuad'
        })
        .add({
          targets: '.result-item',
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 500,
          easing: 'easeOutQuad',
          delay: anime.stagger(100)
        }, '-=200');
    }
  }, [prediction]);

  return (
    <div ref={resultsRef} className="rounded-xl p-6 min-h-96 flex flex-col justify-center" style={{ background: 'rgba(10, 15, 20, 0.7)', border: '1px solid rgba(34, 197, 94, 0.15)' }}>
      {prediction ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-emerald-400" size={28} />
            Valuation Result
          </h2>

          <div className="result-item bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg p-6 border border-emerald-400/30">
            <div className="text-sm text-slate-400 mb-2">Estimated Price</div>
<div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
  {formatIndianCurrency(prediction.price)}
</div>
<div className="text-xs text-slate-500 mt-2">
  Range: {formatIndianCurrency(prediction.minPrice)} - {formatIndianCurrency(prediction.maxPrice)}
</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="result-item bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-emerald-400" />
                <span className="text-xs text-slate-400">Confidence</span>
              </div>
              <div className="text-2xl font-bold text-emerald-400">{prediction.confidence}%</div>
              <div className="w-full h-2 bg-slate-700 rounded-full mt-2">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  style={{ width: `${prediction.confidence}%` }}
                />
              </div>
            </div>

            <div className="result-item bg-slate-800/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-yellow-400" />
                <span className="text-xs text-slate-400">Market Trend</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">+4.2%</div>
              <div className="text-xs text-slate-500 mt-2">Year-over-year growth</div>
            </div>
          </div>

          <div className="result-item bg-slate-800/30 rounded-lg p-4 border border-slate-700 text-sm text-slate-400 space-y-2">
            <div className="flex justify-between">
              <span>Square Feet:</span>
              <span className="text-slate-300">{prediction.features?.squareFeet.toLocaleString()} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span>Bedrooms:</span>
              <span className="text-slate-300">{prediction.features?.bedrooms}</span>
            </div>
            <div className="flex justify-between">
              <span>Bathrooms:</span>
              <span className="text-slate-300">{prediction.features?.bathrooms}</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="text-slate-300">{prediction.features?.location}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-emerald-400/30">
            <TrendingUp className="text-emerald-400" size={40} />
          </div>
          <h3 className="text-xl font-semibold text-white">No Prediction Yet</h3>
          <p className="text-slate-400 text-sm">Fill in the property details and click "Get Prediction" to see the valuation result.</p>
        </div>
      )}
    </div>
  );
}
