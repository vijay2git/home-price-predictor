import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import LoadingState from "../components/LoadingState";
import Footer from "../components/Footer";
import { usePredictor } from "../hooks/usePredictor";
import type { PropertyInput } from "../types";

export default function Index() {
  const { result, loading, error, statusMessage, predict, reset } = usePredictor();
  const [lastInput, setLastInput] = useState<PropertyInput | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => document.getElementById("predict")?.scrollIntoView({ behavior: "smooth" });

  const handlePredict = async (data: PropertyInput) => {
    setLastInput(data);
    await predict(data);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ── Cinematic video background ── */}
      <video className="video-bg" autoPlay muted loop playsInline
        poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80">
        <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-city-at-night-7710/1080p.mp4" type="video/mp4" />
        <source src="https://cdn.coverr.co/videos/coverr-modern-house-exterior-5476/1080p.mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />

      {/* ── Animated background particles ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-10 anim-float"
            style={{
              width: `${150 + i * 80}px`, height: `${150 + i * 80}px`,
              background: i % 3 === 0 ? "radial-gradient(circle,#3b82f6,transparent)" : i % 3 === 1 ? "radial-gradient(circle,#8b5cf6,transparent)" : "radial-gradient(circle,#10b981,transparent)",
              left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`, animationDuration: `${4 + i}s`
            }} />
        ))}
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
        <HeroSection onGetStarted={scrollToForm} />
        <FeaturesSection />
        <HowItWorks />

        {!loading && !result && (
          <PredictionForm onPredict={handlePredict} isLoading={loading} />
        )}
        {loading && <LoadingState message={statusMessage} />}
        {error && !result && (
          <div className="py-16 px-4 text-center">
            <div className="glass rounded-2xl p-8 max-w-md mx-auto border border-red-500/20">
              <p className="text-red-400 font-mono text-sm">{error}</p>
              <button onClick={() => { reset(); scrollToForm(); }}
                className="mt-4 shimmer-btn text-white px-5 py-2 rounded-xl text-sm btn-glow">Try again</button>
            </div>
          </div>
        )}

        <div ref={resultRef}>
          {result && (
            <PredictionResult prediction={result}
              onReset={() => { reset(); scrollToForm(); }}
              onRerun={() => lastInput && handlePredict(lastInput)}
              isLoading={loading} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
