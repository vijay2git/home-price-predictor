import { ArrowRight, TrendingUp, Zap, ShieldCheck, Play } from "lucide-react";

interface Props { onGetStarted: () => void; }

export default function HeroSection({ onGetStarted }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none anim-float" />
      <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-violet-600/12 rounded-full blur-3xl pointer-events-none anim-float" style={{animationDelay:"1.5s"}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 text-sm text-blue-300 mb-8 anim-slide-up border border-blue-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Smart Pricing Engine · 50+ Cities · No API Key Needed
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[1.05] mb-6 anim-slide-up d1">
          <span className="text-white">Discover Your</span>
          <br />
          <span className="gradient-text">Home's True Value</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 anim-slide-up d2 leading-relaxed font-light">
          AI-powered property valuations with real market data.
          Get an instant, accurate estimate for any city worldwide — free, instant, no sign-up.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 anim-slide-up d3">
          <button onClick={onGetStarted}
            className="flex items-center gap-2.5 shimmer-btn text-white font-semibold px-8 py-4 rounded-2xl btn-glow text-base">
            Get Free Estimate
            <ArrowRight className="w-5 h-5" />
          </button>
          <a href="#how-it-works"
            className="flex items-center gap-2.5 glass-light text-white/80 hover:text-white font-medium px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all text-base">
            <Play className="w-4 h-4" />
            How it works
          </a>
        </div>

        {/* Floating stat cards */}
        <div className="grid grid-cols-3 max-w-xl mx-auto gap-3 anim-slide-up d4">
          {[
            { icon: ShieldCheck, label: "Accuracy", value: "87%+", color: "text-blue-400", glow: "glow-blue" },
            { icon: Zap, label: "Response", value: "< 2s", color: "text-violet-400", glow: "glow-violet" },
            { icon: TrendingUp, label: "Cities", value: "50+", color: "text-emerald-400", glow: "glow-emerald" },
          ].map(({ icon: Icon, label, value, color, glow }) => (
            <div key={label} className={`glass rounded-2xl py-4 px-3 card-lift border border-white/5`}>
              <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
              <div className={`font-display font-bold text-2xl ${color} text-center`}>{value}</div>
              <div className="text-xs text-white/40 text-center mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 anim-slide-up d6">
          <span className="text-xs font-mono">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
