export function createHeroSection(container) {
    container.innerHTML = `
        <div class="container">
            <h1><i class="fas fa-chart-line"></i> Home Price Predictor</h1>
            <p>Leverage advanced machine learning to predict property values with precision and confidence</p>
        </div>
    `;
    container.setAttribute('data-section', 'home');
}
