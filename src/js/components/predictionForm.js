import { predictPrice } from '../services/prediction.js';

export function createPredictionForm(container) {
    container.innerHTML = `
        <div class="card" data-section="predict">
            <h2><i class="fas fa-calculator"></i> Price Prediction</h2>
            <form id="predictionForm" style="margin-top: 1.5rem;">
                <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
                    <div class="form-group">
                        <label for="squareFeet">Square Feet</label>
                        <input type="number" id="squareFeet" name="squareFeet" placeholder="e.g., 2500" required>
                    </div>
                    <div class="form-group">
                        <label for="bedrooms">Bedrooms</label>
                        <select id="bedrooms" name="bedrooms" required>
                            <option value="">Select...</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                            <option value="3">3 Bedrooms</option>
                            <option value="4">4 Bedrooms</option>
                            <option value="5">5+ Bedrooms</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="bathrooms">Bathrooms</label>
                        <select id="bathrooms" name="bathrooms" required>
                            <option value="">Select...</option>
                            <option value="1">1 Bathroom</option>
                            <option value="2">2 Bathrooms</option>
                            <option value="3">3 Bathrooms</option>
                            <option value="4">4+ Bathrooms</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="yearBuilt">Year Built</label>
                        <input type="number" id="yearBuilt" name="yearBuilt" placeholder="e.g., 2005" required>
                    </div>
                    <div class="form-group">
                        <label for="garage">Garage Spaces</label>
                        <select id="garage" name="garage" required>
                            <option value="">Select...</option>
                            <option value="0">No Garage</option>
                            <option value="1">1 Space</option>
                            <option value="2">2 Spaces</option>
                            <option value="3">3+ Spaces</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="location">Location (City)</label>
                        <input type="text" id="location" name="location" placeholder="e.g., New York, CA" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="features">Additional Features (Comma-separated)</label>
                    <textarea id="features" name="features" placeholder="e.g., Pool, Hot tub, Garden"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem;">
                    <i class="fas fa-magic"></i> Predict Price
                </button>
            </form>
        </div>
    `;

    document.getElementById('predictionForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await predictPrice();
    });
}
