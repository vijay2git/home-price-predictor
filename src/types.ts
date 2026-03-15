export interface PropertyInput {
  city: string;
  neighborhood: "downtown" | "urban" | "suburban" | "rural";
  propertyType: "house" | "condo" | "townhouse" | "villa";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize: number;
  yearBuilt: number;
  condition: "excellent" | "good" | "fair" | "poor";
  garage: "none" | "1car" | "2car" | "3car";
  pool: boolean;
  renovation: "none" | "partial" | "full";
}

export interface PriceFactor {
  name: string;
  impact_pct: number;
}

export interface PredictionResult {
  estimated_price: number;
  price_low: number;
  price_high: number;
  confidence: number;
  price_per_sqft: number;
  market_trend_pct: number;
  market_temp: string;
  median_area_price: number;
  data_freshness: string;
  top_factors: PriceFactor[];
  market_note: string;
}
