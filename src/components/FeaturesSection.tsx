import { Globe, Zap, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  { icon: Globe, title: "50+ cities worldwide", desc: "US metros and international cities pre-loaded with market data.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Zap, title: "No API key needed", desc: "Fully offline-capable. No account, no credits, zero setup.", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { icon: BarChart3, title: "Factor breakdown", desc: "See exactly which features drive your home's value.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { icon: ShieldCheck, title: "Confidence scoring", desc: "Every estimate includes a confidence % and price range.", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">Why <span className="gradient-text">HomeValue AI</span></h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto">Built for accuracy, speed, and a premium experience.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="glass rounded-2xl p-5 card-lift border border-white/5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-sm text-white mb-2">{title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
