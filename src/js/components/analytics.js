import Chart from 'chart.js/auto';

let priceChartInstance;
let distributionChartInstance;

export function createAnalytics(container) {
    container.setAttribute('data-section', 'analytics');
    container.innerHTML = `
        <h2 style="margin-bottom: 2rem;"><i class="fas fa-chart-line"></i> Market Analytics</h2>
        
        <div class="grid">
            <div class="chart-container">
                <h3>Price Trends (Last 12 Months)</h3>
                <canvas id="priceChart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Price Distribution by Square Footage</h3>
                <canvas id="distributionChart"></canvas>
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h3><i class="fas fa-arrow-trend-up"></i> Market Growth</h3>
                <div style="margin-top: 1.5rem;">
                    <p style="color: var(--text-light); margin-bottom: 0.5rem;">Year-over-Year</p>
                    <p id="marketGrowth" style="font-size: 2rem; font-weight: bold; color: var(--success-color);">—</p>
                </div>
            </div>
            <div class="card">
                <h3><i class="fas fa-house-tsunami"></i> Avg. Days on Market</h3>
                <div style="margin-top: 1.5rem;">
                    <p style="color: var(--text-light); margin-bottom: 0.5rem;">Average</p>
                    <p id="avgDays" style="font-size: 2rem; font-weight: bold;">—</p>
                </div>
            </div>
            <div class="card">
                <h3><i class="fas fa-percentage"></i> Price to List Ratio</h3>
                <div style="margin-top: 1.5rem;">
                    <p style="color: var(--text-light); margin-bottom: 0.5rem;">Average</p>
                    <p id="priceToListRatio" style="font-size: 2rem; font-weight: bold; color: var(--accent-color);">—</p>
                </div>
            </div>
        </div>
    `;

    // Build charts after DOM is ready
    setTimeout(() => initCharts(), 100);
}

export function updateMarketTrendsChart(trendData) {
    initCharts(trendData);
}

export function updateAnalyticsCards(analyticsData) {
    const growthEl = document.getElementById('marketGrowth');
    const daysEl = document.getElementById('avgDays');
    const ratioEl = document.getElementById('priceToListRatio');

    if (growthEl && analyticsData.marketTrend) {
        growthEl.textContent = analyticsData.marketTrend;
    }
    if (daysEl && typeof analyticsData.avgDaysOnMarket !== 'undefined') {
        daysEl.textContent = `${analyticsData.avgDaysOnMarket} Days`;
    }
    if (ratioEl && typeof analyticsData.priceToListRatio !== 'undefined') {
        ratioEl.textContent = `${analyticsData.priceToListRatio}%`;
    }
}

// Expose update helpers globally so the main app can hook into them.
window.updateMarketTrendsChart = updateMarketTrendsChart;
window.updateAnalyticsCards = updateAnalyticsCards;

function initCharts(trendData) {
    const defaultLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const defaultPrices = [385000, 388000, 392000, 395000, 398000, 402000, 405000, 408000, 410000, 412000, 415000, 420000];

    const labels = trendData?.marketData?.months || defaultLabels;
    const prices = trendData?.marketData?.avgPrices || defaultPrices;

    const priceCtx = document.getElementById('priceChart');
    if (priceCtx) {
        if (priceChartInstance) {
            priceChartInstance.data.labels = labels;
            priceChartInstance.data.datasets[0].data = prices;
            priceChartInstance.update();
        } else {
            priceChartInstance = new Chart(priceCtx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'Average Price',
                        data: prices,
                        borderColor: 'var(--primary-color)',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true }
                    }
                }
            });
        }
    }

    const distCtx = document.getElementById('distributionChart');
    if (distCtx) {
        if (distributionChartInstance) {
            distributionChartInstance.update();
        } else {
            distributionChartInstance = new Chart(distCtx, {
                type: 'bar',
                data: {
                    labels: ['<1500', '1500-2000', '2000-2500', '2500-3000', '3000+'],
                    datasets: [{
                        label: 'Number of Properties',
                        data: [120, 280, 350, 220, 145],
                        backgroundColor: 'rgba(37, 99, 235, 0.7)',
                        borderColor: 'var(--primary-color)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true }
                    }
                }
            });
        }
    }
}
