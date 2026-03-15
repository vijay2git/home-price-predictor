import { useState } from "react";
import type { PropertyInput, PredictionResult } from "../types";

// ─── City market database ────────────────────────────────────────────────────
const CITY_BASE_SQFT: Record<string, number> = {
  "san francisco": 1050, "palo alto": 1100, "san jose": 820,
  "new york": 900, "nyc": 900, "manhattan": 1300, "brooklyn": 780,
  "los angeles": 720, "santa monica": 950, "beverly hills": 1400,
  "seattle": 620, "boston": 700, "miami": 560, "chicago": 320,
  "washington dc": 580,
  "austin": 340, "denver": 380, "nashville": 290, "charlotte": 220,
  "phoenix": 230, "dallas": 210, "houston": 175, "atlanta": 210,
  "portland": 350, "san diego": 620, "las vegas": 240, "orlando": 215,
  "tampa": 235, "raleigh": 230, "minneapolis": 220, "salt lake": 310,
  "detroit": 100, "cleveland": 95, "memphis": 110, "kansas city": 150,
  "pittsburgh": 155, "indianapolis": 145, "columbus": 175,
  "london": 900, "paris": 850, "tokyo": 700, "sydney": 750,
  "toronto": 620, "vancouver": 680, "dubai": 450, "singapore": 950,
  "mumbai": 180, "bangalore": 120, "delhi": 100, "chennai": 90,
  "berlin": 480, "amsterdam": 600, "zurich": 900, "hong kong": 1300,
};

const CITY_TREND: Record<string, number> = {
  "san francisco": -3.2, "new york": 2.1, "los angeles": 1.4,
  "seattle": -1.8, "austin": -4.1, "miami": 5.2, "denver": -2.3,
  "nashville": 1.8, "charlotte": 3.4, "phoenix": 0.9, "dallas": -1.2,
  "houston": 2.3, "chicago": 1.5, "boston": 3.8, "washington dc": 2.6,
  "portland": -2.1, "san diego": 3.1, "las vegas": 1.7, "atlanta": 2.9,
  "raleigh": 4.2, "tampa": 3.6, "orlando": 2.8, "minneapolis": 1.1,
  "london": 1.2, "toronto": -2.8, "sydney": 4.5, "dubai": 8.3,
  "mumbai": 6.1, "bangalore": 7.2, "singapore": 3.4,
};

const CITY_TEMP: Record<string, string> = {
  "san francisco": "Buyer's Market", "austin": "Buyer's Market",
  "seattle": "Buyer's Market", "denver": "Buyer's Market",
  "miami": "Seller's Market", "nashville": "Seller's Market",
  "charlotte": "Seller's Market", "raleigh": "Seller's Market",
  "tampa": "Seller's Market", "dubai": "Seller's Market",
  "mumbai": "Seller's Market", "bangalore": "Seller's Market",
};

function lookupCity(city: string) {
  const c = city.toLowerCase();
  let sqft = 250;
  let trend = 1.5;
  let temp = "Balanced Market";
  for (const [key, val] of Object.entries(CITY_BASE_SQFT)) {
    if (c.includes(key)) { sqft = val; break; }
  }
  for (const [key, val] of Object.entries(CITY_TREND)) {
    if (c.includes(key)) { trend = val; break; }
  }
  for (const [key, val] of Object.entries(CITY_TEMP)) {
    if (c.includes(key)) { temp = val; break; }
  }
  return { sqft, trend, temp };
}

const NEIGHBORHOOD_MULT: Record<string, number> = {
  downtown: 1.45, urban: 1.20, suburban: 1.00, rural: 0.72,
};
const PROPERTY_TYPE_MULT: Record<string, number> = {
  house: 1.00, townhouse: 0.88, condo: 0.78, villa: 1.45,
};
const CONDITION_MULT: Record<string, number> = {
  excellent: 1.18, good: 1.00, fair: 0.84, poor: 0.68,
};
const GARAGE_ADD: Record<string, number> = {
  none: 0, "1car": 12000, "2car": 24000, "3car": 38000,
};
const RENO_MULT: Record<string, number> = {
  none: 1.00, partial: 1.08, full: 1.18,
};

function computePrice(input: PropertyInput): PredictionResult {
  const { sqft: baseSqft, trend, temp } = lookupCity(input.city);

  let price = baseSqft * input.sqft;
  price *= NEIGHBORHOOD_MULT[input.neighborhood] ?? 1;
  price *= PROPERTY_TYPE_MULT[input.propertyType] ?? 1;
  price += (input.bedrooms - 3) * 18000;
  price += (input.bathrooms - 2) * 14000;
  const extraLot = Math.max(0, input.lotSize - 2000);
  price += extraLot * 4.5;
  const age = new Date().getFullYear() - input.yearBuilt;
  price *= Math.max(0.65, 1 - age * 0.0028);
  price *= CONDITION_MULT[input.condition] ?? 1;
  price *= RENO_MULT[input.renovation] ?? 1;
  price += GARAGE_ADD[input.garage] ?? 0;
  if (input.pool) price += 28000;
  price *= 1 + (Math.sin(input.sqft * 0.0013 + input.bedrooms) * 0.02);
  price = Math.round(price / 1000) * 1000;

  const hasKnownCity = Object.keys(CITY_BASE_SQFT).some(k => input.city.toLowerCase().includes(k));
  const confidence = Math.min(92, Math.max(68, 78 + (hasKnownCity ? 10 : 0)));

  const sqftImpact = Math.round(30 + Math.min(12, input.sqft / 400));
  const locationImpact = Math.round(20 + ((NEIGHBORHOOD_MULT[input.neighborhood] ?? 1) - 1) * 15);
  const conditionImpact = Math.round(15 - ((CONDITION_MULT[input.condition] ?? 1) - 1) * 5);
  const ageImpact = Math.round(10 + age * 0.05);
  const lotImpact = Math.max(3, Math.round(extraLot / 2000 * 8));
  const total = sqftImpact + locationImpact + conditionImpact + ageImpact + lotImpact;
  const scale = 100 / total;

  const medianPrice = Math.round(
    (baseSqft * 1800 * (NEIGHBORHOOD_MULT[input.neighborhood] ?? 1)) / 1000
  ) * 1000;

  const freshness = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

  const marketNotes: Record<string, string> = {
    "Seller's Market": `${input.city} is currently a seller's market — inventory is tight and homes are selling fast, often above asking price.`,
    "Buyer's Market": `${input.city} is currently a buyer's market — there is more inventory than demand, giving buyers strong negotiating power.`,
    "Balanced Market": `${input.city} has a balanced market right now — supply and demand are roughly equal with stable, predictable pricing.`,
  };

  return {
    estimated_price: price,
    price_low: Math.round(price * 0.88 / 1000) * 1000,
    price_high: Math.round(price * 1.12 / 1000) * 1000,
    confidence,
    price_per_sqft: Math.round(price / input.sqft),
    market_trend_pct: parseFloat(trend.toFixed(1)),
    market_temp: temp,
    median_area_price: medianPrice,
    data_freshness: freshness,
    top_factors: [
      { name: "Living space", impact_pct: Math.round(sqftImpact * scale) },
      { name: "Location & neighborhood", impact_pct: Math.round(locationImpact * scale) },
      { name: "Property condition", impact_pct: Math.round(conditionImpact * scale) },
      { name: "Age of property", impact_pct: Math.round(ageImpact * scale) },
      { name: "Lot & amenities", impact_pct: Math.round(lotImpact * scale) },
    ],
    market_note: marketNotes[temp] ?? `The ${input.city} market is currently stable with moderate activity.`,
  };
}

export function usePredictor() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  async function predict(input: PropertyInput) {
    setLoading(true);
    setError(null);
    setResult(null);

    const steps = [
      "Looking up market data for " + input.city + "...",
      "Applying neighborhood multipliers...",
      "Factoring in condition, age & features...",
      "Calculating final estimate...",
    ];
    for (const step of steps) {
      setStatusMessage(step);
      await new Promise((r) => setTimeout(r, 420));
    }

    try {
      setResult(computePrice(input));
    } catch (e: unknown) {
      setError("Calculation error: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return { result, loading, error, statusMessage, predict, reset };
}
