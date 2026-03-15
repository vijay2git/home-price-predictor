import { useState } from "react";
import { MapPin, Bed, Bath, Square, Calendar, Sparkles, Car, Waves, Hammer, TrendingUp } from "lucide-react";
import type { PropertyInput } from "../types";
import { formatNumber } from "../lib/utils";

interface Props { onPredict: (data: PropertyInput) => void; isLoading: boolean; }

const INPUT = "glass-input w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30";

export default function PredictionForm({ onPredict, isLoading }: Props) {
  const [form, setForm] = useState<PropertyInput>({
    city: "Austin, TX", neighborhood: "suburban", propertyType: "house",
    bedrooms: 3, bathrooms: 2, sqft: 1800, lotSize: 5000,
    yearBuilt: 2010, condition: "good", garage: "1car", pool: false, renovation: "none",
  });
  const set = <K extends keyof PropertyInput>(k: K, v: PropertyInput[K]) =>
    setForm(p => ({ ...p, [k]: v }));

  return (
    <section id="predict" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 anim-slide-up">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3 h-3" /> PROPERTY DETAILS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Describe Your <span className="gradient-text">Property</span>
          </h2>
          <p className="text-white/40 text-sm">Fill in the details below for an instant valuation</p>
        </div>

        {/* Glass card form */}
        <div className="glass rounded-3xl overflow-hidden border border-white/8 anim-scale-in shadow-2xl" style={{boxShadow:"0 25px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.08)"}}>

          {/* Location */}
          <Section label="📍 Location" color="blue">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="City / Area" icon={<MapPin className="w-3.5 h-3.5 text-blue-400"/>}>
                <input type="text" value={form.city} onChange={e => set("city", e.target.value)}
                  placeholder="e.g. Austin, TX | Mumbai | London" className={INPUT} required />
              </Field>
              <Field label="Neighborhood" icon={<MapPin className="w-3.5 h-3.5 text-blue-400"/>}>
                <select value={form.neighborhood} onChange={e => set("neighborhood", e.target.value as PropertyInput["neighborhood"])} className={INPUT}>
                  <option value="downtown">Downtown / City center</option>
                  <option value="urban">Urban / Inner suburb</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural / Outskirts</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* Property */}
          <Section label="🏠 Property" color="violet" alt>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Property type" icon={<Sparkles className="w-3.5 h-3.5 text-violet-400"/>}>
                <select value={form.propertyType} onChange={e => set("propertyType", e.target.value as PropertyInput["propertyType"])} className={INPUT}>
                  <option value="house">Single-family house</option>
                  <option value="condo">Condo / Apartment</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="villa">Villa / Luxury</option>
                </select>
              </Field>
              <SliderField icon={<Bed className="w-3.5 h-3.5 text-violet-400"/>} label="Bedrooms"
                value={form.bedrooms} min={1} max={10} step={1} display={String(form.bedrooms)}
                onChange={v => set("bedrooms", v)} color="violet" />
              <SliderField icon={<Bath className="w-3.5 h-3.5 text-violet-400"/>} label="Bathrooms"
                value={form.bathrooms} min={1} max={6} step={0.5} display={String(form.bathrooms)}
                onChange={v => set("bathrooms", v)} color="violet" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <SliderField icon={<Square className="w-3.5 h-3.5 text-violet-400"/>} label="Living area (sq ft)"
                value={form.sqft} min={400} max={10000} step={100} display={formatNumber(form.sqft)}
                onChange={v => set("sqft", v)} color="violet" />
              <SliderField icon={<Square className="w-3.5 h-3.5 text-violet-400"/>} label="Lot size (sq ft)"
                value={form.lotSize} min={0} max={50000} step={500} display={formatNumber(form.lotSize)}
                onChange={v => set("lotSize", v)} color="violet" />
            </div>
          </Section>

          {/* Condition */}
          <Section label="✨ Condition & Features" color="emerald">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Year built" icon={<Calendar className="w-3.5 h-3.5 text-emerald-400"/>}>
                <input type="number" value={form.yearBuilt} min={1900} max={2025}
                  onChange={e => set("yearBuilt", parseInt(e.target.value) || 2000)}
                  className={INPUT + " font-mono"} />
              </Field>
              <Field label="Condition" icon={<Sparkles className="w-3.5 h-3.5 text-emerald-400"/>}>
                <select value={form.condition} onChange={e => set("condition", e.target.value as PropertyInput["condition"])} className={INPUT}>
                  <option value="excellent">Excellent / New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Needs renovation</option>
                </select>
              </Field>
              <Field label="Garage" icon={<Car className="w-3.5 h-3.5 text-emerald-400"/>}>
                <select value={form.garage} onChange={e => set("garage", e.target.value as PropertyInput["garage"])} className={INPUT}>
                  <option value="none">No garage</option>
                  <option value="1car">1-car garage</option>
                  <option value="2car">2-car garage</option>
                  <option value="3car">3-car garage</option>
                </select>
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Field label="Swimming pool" icon={<Waves className="w-3.5 h-3.5 text-emerald-400"/>}>
                <div className="flex gap-2">
                  {([false, true] as const).map(val => (
                    <button key={String(val)} type="button" onClick={() => set("pool", val)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                        form.pool === val
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                          : "glass-light text-white/50 border-white/8 hover:border-white/20 hover:text-white/80"
                      }`}>{val ? "Has pool" : "No pool"}</button>
                  ))}
                </div>
              </Field>
              <Field label="Renovation" icon={<Hammer className="w-3.5 h-3.5 text-emerald-400"/>}>
                <select value={form.renovation} onChange={e => set("renovation", e.target.value as PropertyInput["renovation"])} className={INPUT}>
                  <option value="none">Not recently renovated</option>
                  <option value="partial">Partially renovated</option>
                  <option value="full">Fully renovated</option>
                </select>
              </Field>
            </div>
          </Section>

          {/* Submit */}
          <div className="px-6 sm:px-8 py-6 border-t border-white/5">
            <button type="button" disabled={isLoading} onClick={() => onPredict(form)}
              className="w-full flex items-center justify-center gap-3 shimmer-btn text-white font-bold text-base py-4 px-8 rounded-2xl btn-glow disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden">
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating your estimate...
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  Estimate Market Value
                  <span className="text-white/60 text-sm font-normal">— instant & free</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-white/25 mt-3 font-mono">
              NO API KEY · NO SIGN UP · WORKS OFFLINE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ label, children, color, alt }: { label: string; children: React.ReactNode; color: string; alt?: boolean }) {
  const borders: Record<string, string> = { blue: "border-blue-500/20", violet: "border-violet-500/20", emerald: "border-emerald-500/20" };
  const texts: Record<string, string> = { blue: "text-blue-400", violet: "text-violet-400", emerald: "text-emerald-400" };
  return (
    <div className={`px-6 sm:px-8 py-6 border-b border-white/5 ${alt ? "bg-white/[0.02]" : ""}`}>
      <div className={`flex items-center gap-2 mb-4`}>
        <span className={`text-xs font-mono font-semibold uppercase tracking-widest ${texts[color]}`}>{label}</span>
        <div className={`flex-1 h-px bg-gradient-to-r from-current to-transparent opacity-20 ${texts[color]}`} />
      </div>
      {children}
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium mb-2 text-white/50 uppercase tracking-wide">
        {icon}{label}
      </label>
      {children}
    </div>
  );
}

function SliderField({ icon, label, value, min, max, step, display, onChange, color }: {
  icon: React.ReactNode; label: string; value: number; min: number; max: number;
  step: number; display: string; onChange: (v: number) => void; color: string;
}) {
  const accents: Record<string, string> = { violet: "#8b5cf6", emerald: "#10b981", blue: "#3b82f6" };
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium mb-2 text-white/50 uppercase tracking-wide">
        {icon}{label}
      </label>
      <div className="glass-light rounded-xl px-3 py-2 border border-white/8 hover:border-white/15 transition-colors">
        <div className="flex items-center gap-3">
          <input type="range" min={min} max={max} step={step} value={value}
            onChange={e => onChange(parseFloat(e.target.value))}
            style={{ accentColor: accents[color] || "#8b5cf6" }}
            className="flex-1 h-1.5 cursor-pointer" />
          <span className="font-mono text-sm font-semibold min-w-[52px] text-right tabular-nums"
            style={{ color: accents[color] }}>{display}</span>
        </div>
      </div>
    </div>
  );
}
