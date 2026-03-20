function formatINR(value, options = {}) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
        ...options
    }).format(value);
}

export function createResultsSection(container) {
    // This will be populated dynamically
    container.innerHTML = '';
}

export function displayResults(prediction) {
    const resultsSection = document.querySelector('.results-section');
    
    resultsSection.innerHTML = `
        <div class="prediction-result">
            <h2>Predicted Price</h2>
            <div class="predicted-price">${formatINR(prediction.price)}</div>
            <div class="price-range">
                Range: ${formatINR(prediction.minPrice)} - ${formatINR(prediction.maxPrice)}
            </div>
            <div style="margin-top: 1rem; opacity: 0.9;">
                Confidence: ${prediction.confidence}%
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <h3><i class="fas fa-home"></i> Property Details</h3>
                <table style="width: 100%; margin-top: 1rem;">
                    <tr>
                        <td style="padding: 0.5rem 0;"><strong>Square Feet:</strong></td>
                        <td>${prediction.features.squareFeet.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;"><strong>Bedrooms:</strong></td>
                        <td>${prediction.features.bedrooms}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;"><strong>Bathrooms:</strong></td>
                        <td>${prediction.features.bathrooms}</td>
                    </tr>
                    <tr>
                        <td style="padding: 0.5rem 0;"><strong>Year Built:</strong></td>
                        <td>${prediction.features.yearBuilt}</td>
                    </tr>
                </table>
            </div>

            <div class="card">
                <h3><i class="fas fa-chart-bar"></i> Price Per Unit</h3>
                <div style="margin-top: 1.5rem;">
                    <p style="color: var(--text-light); margin-bottom: 0.5rem;">Price per Square Foot:</p>
                    <p style="font-size: 1.8rem; font-weight: bold; color: var(--primary-color);">
                        ${formatINR(prediction.price / prediction.features.squareFeet, { maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>
        </div>

        <div class="card" style="margin-top: 2rem;">
            <h3><i class="fas fa-buildings"></i> Comparable Properties</h3>
            <table class="comparables-table">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Sq Ft</th>
                        <th>Price</th>
                        <th>Similarity</th>
                    </tr>
                </thead>
                <tbody>
                    ${prediction.comparables.map(comp => `
                        <tr>
                            <td>${comp.address}</td>
                            <td>${comp.sqft.toLocaleString('en-IN')}</td>
                            <td>${formatINR(comp.price)}</td>
                            <td>${comp.similarity}%</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    resultsSection.classList.add('active');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}
