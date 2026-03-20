import { createNavigation } from './components/navigation.js';
import { createHeroSection } from './components/hero.js';
import { createPredictionForm } from './components/predictionForm.js';
import { createResultsSection } from './components/results.js';
import { createAnalytics } from './components/analytics.js';
import { createFooter } from './components/footer.js';

export function initApp() {
    const app = document.getElementById('app');
    
    // Create main structure
    app.innerHTML = `
        <nav></nav>
        <main>
            <section class="hero"></section>
            <div class="container">
                <div class="grid">
                    <div class="prediction-container"></div>
                    <div class="market-info"></div>
                </div>
                <section class="results-section"></section>
                <section class="analytics-section"></section>
            </div>
        </main>
        <footer></footer>
    `;

    // Initialize components
    createNavigation(document.querySelector('nav'));
    createHeroSection(document.querySelector('.hero'));
    createPredictionForm(document.querySelector('.prediction-container'));
    createAnalytics(document.querySelector('.analytics-section'));
    createMarketInfo(document.querySelector('.market-info'));
    createFooter(document.querySelector('footer'));
}

function formatINR(value, options = {}) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
        ...options
    }).format(value);
}

function createMarketInfo(container) {
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-chart-line"></i> Market Insights</h3>
            <div class="market-insights" style="margin-top: 1.5rem;">
                <div style="margin-bottom: 1.5rem;">
                    <p style="color: var(--text-light); font-size: 0.9rem;">Average Price</p>
                    <p id="avgPrice" style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">—</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <p style="color: var(--text-light); font-size: 0.9rem;">Market Trend</p>
                    <p id="marketTrend" style="font-size: 1.5rem; font-weight: bold; color: var(--success-color);">—</p>
                </div>
                <div>
                    <p style="color: var(--text-light); font-size: 0.9rem;">Properties Listed</p>
                    <p id="propertiesListed" style="font-size: 1.5rem; font-weight: bold;">—</p>
                </div>
            </div>
        </div>
    `;

    loadMarketTrends();
    loadMarketAnalytics();
}

async function loadMarketTrends() {
    try {
        const resp = await fetch('/api/market-trends');
        if (!resp.ok) throw new Error('Failed to load market trends');
        const data = await resp.json();

        const avgPrice = data.marketData?.avgPrices?.length
            ? data.marketData.avgPrices[data.marketData.avgPrices.length - 1]
            : null;

        const avgPriceEl = document.getElementById('avgPrice');
        const trendEl = document.getElementById('marketTrend');

        if (avgPriceEl && avgPrice !== null) {
            avgPriceEl.textContent = formatINR(avgPrice);
        }

        if (trendEl) {
            trendEl.textContent = `${data.yoyGrowth || 0}% (${data.trend || 'stable'})`;
        }

        if (window.updateMarketTrendsChart) {
            window.updateMarketTrendsChart(data);
        }
    } catch (err) {
        console.warn('Could not load market trends', err);
    }
}

async function loadMarketAnalytics() {
    try {
        const resp = await fetch('/api/analytics');
        if (!resp.ok) throw new Error('Failed to load analytics');
        const analytics = await resp.json();

        const propertiesListedEl = document.getElementById('propertiesListed');
        if (propertiesListedEl) {
            propertiesListedEl.textContent = analytics.propertiesListed?.toLocaleString('en-IN') ?? '—';
        }

        if (window.updateAnalyticsCards) {
            window.updateAnalyticsCards(analytics);
        }
    } catch (err) {
        console.warn('Could not load analytics', err);
    }
}
