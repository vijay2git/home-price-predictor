import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Home, BarChart3, Target, DollarSign, RefreshCw, Info, CheckCircle2, Sparkles } from "lucide-react";
import type { PredictionResult } from "../types";
import { formatCurrency } from "../lib/utils";

interface Props { prediction: PredictionResult; onReset: () => void; onRerun: () => void; isLoading: boolean; }

function useCountUp(target: number, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.round(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return val;
}

const BAR_COLORS = ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444"];

export default function PredictionResult({ prediction: p, onReset, onRerun, isLoading }: Props) {
  const animatedPrice = useCountUp(p.estimated_price);
  const isUp = p.market_trend_pct >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const sign = isUp ? "+" : "";
  const vsMedian = Math.round(((p.estimated_price - p.median_area_price) / p.median_area_price) * 100);

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Header */}
        <div className="text-center mb-8 anim-slide-up">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" /> VALUATION COMPLETE
          </span>
          <h2 className="font-display font-bold text-3xl text-white">Your Property <span className="gradient-text">Estimate</span></h2>
        </div>

        {/* ── Main price card ── */}
        <div className="glass rounded-3xl overflow-hidden border border-white/8 anim-scale-in"
          style={{boxShadow:"0 30px 80px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.08)"}}>

          {/* Price hero */}
          <div className="p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-violet-600/5 to-transparent" />
            <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/50 font-mono uppercase tracking-widest">Estimated Market Value</span>
                </div>
                <div className="font-display font-bold text-5xl sm:text-6xl text-white leading-none tabular-nums anim-count"
                  style={{textShadow:"0 0 40px rgba(99,102,241,0.5)"}}>
                  {formatCurrency(animatedPrice)}
                </div>
                <div className="text-sm text-white/35 mt-2 font-mono">
                  {formatCurrency(p.price_low)} — {formatCurrency(p.price_high)}
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium border ${isUp ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : "bg-red-500/15 text-red-300 border-red-500/30"}`}>
                    <TrendIcon className="w-3 h-3" />{sign}{p.market_trend_pct.toFixed(1)}% YoY
                  </span>
                  <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60">{p.market_temp}</span>
                  <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 font-mono">${Math.round(p.price_per_sqft)}/sqft</span>
                </div>
              </div>

              {/* Confidence ring */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none"
                      stroke="url(#confGrad)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${p.confidence * 2.51} 251`}
                      style={{transition:"stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)"}} />
                    <defs>
                      <linearGradient id="confGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-mono font-bold text-xl text-white">{p.confidence}%</span>
                    <span className="text-[10px] text-white/40 font-mono">confidence</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/30 font-mono">{p.data_freshness}</span>
              </div>
            </div>

            {/* Range bar */}
            <div className="mt-7 glass-light rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Price Range</span>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="absolute h-full rounded-full" style={{left:"10%",right:"10%",background:"linear-gradient(90deg,rgba(59,130,246,0.4),rgba(139,92,246,0.8),rgba(59,130,246,0.4))"}} />
                <div className="absolute h-full w-0.5 bg-white rounded-full" style={{left:"50%",transform:"translateX(-50%)"}} />
              </div>
              <div className="flex justify-between text-xs mt-2.5">
                <div><span className="text-white/30">Low</span><div className="font-mono font-medium text-white/70 mt-0.5">{formatCurrency(p.price_low)}</div></div>
                <div className="text-center"><span className="text-white/30">Most likely</span><div className="font-mono font-bold gradient-text mt-0.5">{formatCurrency(p.estimated_price)}</div></div>
                <div className="text-right"><span className="text-white/30">High</span><div className="font-mono font-medium text-white/70 mt-0.5">{formatCurrency(p.price_high)}</div></div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/5">
            {[
              { icon: DollarSign, label: "Area median", value: formatCurrency(p.median_area_price), color: "text-blue-400" },
              { icon: BarChart3, label: "vs. Median", value: `${vsMedian >= 0 ? "+" : ""}${vsMedian}%`, color: vsMedian >= 0 ? "text-emerald-400" : "text-red-400" },
              { icon: TrendIcon, label: "Market trend", value: `${sign}${p.market_trend_pct.toFixed(1)}%`, color: isUp ? "text-emerald-400" : "text-red-400" },
              { icon: Target, label: "Per sq ft", value: `$${Math.round(p.price_per_sqft)}`, color: "text-violet-400" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="p-5 text-center border-r border-white/5 last:border-r-0 hover:bg-white/[0.02] transition-colors">
                <Icon className={`w-4 h-4 ${color} mx-auto mb-2`} />
                <div className={`font-mono text-lg font-bold ${color}`}>{value}</div>
                <div className="text-xs text-white/35 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Factor chart */}
        <div className="glass rounded-3xl p-6 sm:p-8 border border-white/8 anim-slide-up d2"
          style={{boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">What drives your home's value</h3>
              <p className="text-xs text-white/35">Factor importance breakdown</p>
            </div>
          </div>
          <div className="space-y-3">
            {p.top_factors.map((f, i) => (
              <div key={f.name} className="anim-slide-up" style={{animationDelay:`${0.1+i*0.07}s`}}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/60">{f.name}</span>
                  <span className="font-mono font-medium" style={{color:BAR_COLORS[i]}}>{f.impact_pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{width:`${f.impact_pct * 2}%`, background: `linear-gradient(90deg, ${BAR_COLORS[i]}99, ${BAR_COLORS[i]})`, boxShadow:`0 0 8px ${BAR_COLORS[i]}60`}} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market insight */}
        <div className="glass rounded-2xl p-5 flex gap-3 border border-amber-500/15 anim-slide-up d3"
          style={{boxShadow:"0 0 40px rgba(245,158,11,0.05)"}}>
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Market Insight</div>
            <p className="text-sm text-white/50 leading-relaxed">{p.market_note}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center pt-2 anim-slide-up d4">
          <button onClick={onRerun} disabled={isLoading}
            className="flex items-center gap-2 shimmer-btn text-white px-6 py-3 rounded-full text-sm font-semibold btn-glow disabled:opacity-50">
            <RefreshCw className="w-4 h-4" /> Recalculate
          </button>
          <button onClick={onReset}
            className="flex items-center gap-2 glass-light text-white/70 hover:text-white border border-white/10 hover:border-white/20 px-6 py-3 rounded-full text-sm font-medium transition-all">
            <Sparkles className="w-4 h-4" /> Value another property
          </button>
        </div>
      </div>
    </section>
  );
}
