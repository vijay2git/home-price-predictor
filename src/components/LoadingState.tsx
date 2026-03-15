interface Props { message: string; }

const steps = [
  "Looking up market data for your city...",
  "Applying neighborhood multipliers...",
  "Factoring in condition, age & features...",
  "Calculating final estimate...",
];

export default function LoadingState({ message }: Props) {
  const active = steps.findIndex(s => message.includes(s.split(" ").slice(0, 3).join(" ")));
  return (
    <section className="py-24 px-4 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-sm mx-auto text-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" style={{animationDuration:"1.5s",animationDirection:"reverse"}} />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">🏠</div>
          <div className="absolute inset-0 rounded-full" style={{boxShadow:"0 0 30px rgba(99,102,241,0.3)"}} />
        </div>
        <h3 className="font-display font-bold text-2xl text-white mb-2">Calculating Value</h3>
        <p className="text-white/40 text-sm mb-8 font-mono">{message || "Analyzing property data..."}</p>
        <div className="space-y-3 text-left glass rounded-2xl p-5 border border-white/8">
          {steps.map((step, i) => {
            const done = active > i;
            const current = active === i;
            return (
              <div key={step} className={`flex items-center gap-3 text-sm transition-all duration-500 ${done || current ? "opacity-100" : "opacity-20"}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  done ? "bg-emerald-500 border-emerald-500" : current ? "border-blue-400 border-t-transparent animate-spin" : "border-white/20"
                }`}>
                  {done && <svg viewBox="0 0 10 10" className="w-3 h-3"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
                </span>
                <span className={done ? "line-through text-white/30" : current ? "text-white font-medium" : "text-white/40"}>{step}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
