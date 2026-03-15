import { Search, Cpu, BarChart3 } from "lucide-react";

const steps = [
  { icon: Search, title: "Enter property details", desc: "City, size, bedrooms, condition and other key features.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Cpu, title: "Smart engine runs", desc: "Our pricing model applies real market multipliers for your exact city.", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { icon: BarChart3, title: "Get your estimate", desc: "Instant price with confidence score, factor chart, and market insight.", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">How It <span className="gradient-text">Works</span></h2>
          <p className="text-white/40 text-sm max-w-sm mx-auto">Three steps to an accurate valuation — no API key, no sign-up.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {steps.map(({ icon: Icon, title, desc, color, bg }, i) => (
            <div key={title} className="glass rounded-2xl p-6 relative card-lift border border-white/5">
              <div className={`absolute -top-4 left-6 w-8 h-8 rounded-full gradient-primary text-white text-sm flex items-center justify-center font-bold shadow-lg`}>
                {i + 1}
              </div>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 mt-3 border ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-semibold text-sm text-white mb-2">{title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
