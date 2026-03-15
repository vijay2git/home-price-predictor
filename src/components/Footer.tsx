import { Home } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg gradient-primary flex items-center justify-center">
            <Home className="w-3 h-3 text-white" />
          </div>
          <span className="font-display font-bold text-white/60">HomeValue AI</span>
        </div>
        <p className="text-center text-xs">Estimates are for informational purposes only. Consult a licensed appraiser for official valuations.</p>
        <p className="text-xs font-mono">v3.0 · No API Key</p>
      </div>
    </footer>
  );
}
