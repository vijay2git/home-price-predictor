import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import anime from 'animejs';
import { LineChart, BarChart3 } from 'lucide-react';

export default function Analytics() {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Average Market Price',
            data: [3850000, 3880000, 3920000, 3950000, 3980000, 4020000],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.5,
            fill: true,
            pointRadius: 6,
            pointBackgroundColor: 'rgb(45, 212, 191)',
            pointBorderColor: '#fff',
            pointHoverRadius: 8,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgb(148, 163, 184)',
              font: { size: 12, weight: 'bold' },
              padding: 20
            }
          }
        },
        scales: {
          y: {
            ticks: {
              color: 'rgb(148, 163, 184)',
              callback: (value) => '₹' + (value / 100000).toFixed(0) + 'L'
            },
            grid: {
              color: 'rgba(100, 116, 139, 0.1)',
              drawBorder: false
            }
          },
          x: {
            ticks: { color: 'rgb(148, 163, 184)' },
            grid: { display: false }
          }
        }
      }
    });

    // Animate chart
    anime({
      targets: containerRef.current,
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 800,
      easing: 'easeOutQuad'
    });
  }, []);

  return (
    <div ref={containerRef} className="rounded-xl p-6" style={{ background: 'rgba(10, 15, 20, 0.7)', border: '1px solid rgba(34, 197, 94, 0.15)' }}>
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <LineChart className="text-emerald-400" size={28} />
        Market Analytics
      </h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Avg Price', value: '₹42.5L', icon: '📊', trend: '+4.2%' },
          { label: 'Properties Listed', value: '1,245', icon: '🏠', trend: '+12%' },
          { label: 'Avg Days on Market', value: '28 days', icon: '📅', trend: '-5%' },
          { label: 'Price to List Ratio', value: '98.2%', icon: '💰', trend: '+2%' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-xs text-slate-400 mb-1">{stat.label}</div>
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className={`text-xs mt-2 ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700" style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[
          { title: 'Market Trend', value: 'Upward', icon: '📈' },
          { title: 'Growth Rate', value: '+8.5% YoY', icon: '📊' },
          { title: 'Momentum', value: 'Strong', icon: '⚡' }
        ].map((item, i) => (
          <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 text-center">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-xs text-slate-400 mb-1">{item.title}</div>
            <div className="text-lg font-bold text-blue-400">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
