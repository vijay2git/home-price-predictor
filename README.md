# HomeValue — AI House Price Predictor

A production-ready React + TypeScript web app that estimates home prices using **live real estate market data** fetched by Claude AI with web search — not static formulas.

---

## Features

- **Live market data** — every prediction triggers a real web search for current prices in your city
- **Any location worldwide** — works for any city with available market data
- **Full property inputs** — location, neighborhood, type, beds/baths, sqft, lot, year, condition, garage, pool, renovation
- **Rich results** — estimated price, confidence score, price range, YoY trend, market temperature, factor importance chart
- **Re-estimate anytime** — hit refresh to get updated data without changing inputs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Routing | React Router v6 |
| AI / Search | Claude claude-sonnet-4-20250514 + web_search tool |

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/your-username/home-price-predictor.git
cd home-price-predictor
npm install
```

### 2. Add your Anthropic API key

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx           # Sticky nav with live indicator
│   ├── HeroSection.tsx      # Landing hero with stats
│   ├── FeaturesSection.tsx  # Feature highlights
│   ├── HowItWorks.tsx       # 3-step explainer
│   ├── PredictionForm.tsx   # Full property input form
│   ├── PredictionResult.tsx # Results: price, chart, insights
│   ├── LoadingState.tsx     # Loading animation
│   └── ErrorState.tsx       # Error + API key guidance
├── hooks/
│   └── usePredictor.ts      # All AI prediction logic
├── pages/
│   ├── Index.tsx            # Main page orchestrator
│   └── NotFound.tsx         # 404 page
├── lib/
│   └── utils.ts             # Formatting helpers
└── types.ts                 # Shared TypeScript interfaces
```

---

## How the prediction works

1. User fills in property details (city, size, type, condition, etc.)
2. `usePredictor` hook builds a prompt and calls the Anthropic API
3. Claude uses its `web_search` tool to fetch:
   - Current median home prices for the city
   - Price per square foot trends
   - Year-over-year market change %
   - Buyer's / seller's market status
4. Claude returns a structured JSON estimate grounded in real data
5. Results display: estimated price, confidence ring, factor chart, market insight

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_ANTHROPIC_API_KEY` | Your Anthropic API key (required) |

> **Security note:** This app calls the Anthropic API directly from the browser using the `anthropic-dangerous-direct-browser-access` header. This is fine for local development. For production, proxy the API call through your own backend to keep the key secret.

---

## Build for production

```bash
npm run build
npm run preview
```

---

## License

MIT
