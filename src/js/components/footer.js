export function createFooter(container) {
    container.innerHTML = `
        <div class="container">
            <p>&copy; 2024 Home Price Predictor. Powered by Machine Learning.</p>
            <p style="margin-top: 0.5rem; opacity: 0.8;">
                <i class="fas fa-lock"></i> Your data is secure and never shared
            </p>
        </div>
    `;
}
