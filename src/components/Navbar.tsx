import { Home, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-blue">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg tracking-tight">HomeValue</span>
            <span className="text-xs text-blue-400 block -mt-0.5 font-mono">AI</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="#how-it-works" className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            How it works
          </a>
          <a href="#predict"
            className="flex items-center gap-2 shimmer-btn text-white text-sm font-medium px-4 py-2 rounded-xl btn-glow">
            <Sparkles className="w-3.5 h-3.5" />
            Get Estimate
          </a>
        </div>
      </div>
    </nav>
  );
}
