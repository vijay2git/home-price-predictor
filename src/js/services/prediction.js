import { displayResults } from '../components/results.js';

export async function predictPrice() {
    const form = document.getElementById('predictionForm');
    const formData = new FormData(form);
    
    // Show loading state
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner"></i> Predicting...';

    try {
        // Prepare data
        const data = {
            squareFeet: parseFloat(formData.get('squareFeet')),
            bedrooms: parseInt(formData.get('bedrooms')),
            bathrooms: parseInt(formData.get('bathrooms')),
            yearBuilt: parseInt(formData.get('yearBuilt')),
            garage: parseInt(formData.get('garage')),
            location: formData.get('location'),
            features: formData.get('features')
        };

        // Call prediction API (backend)
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Prediction failed');
        }

        const prediction = await response.json();

        // Fetch comparable properties (backend provides mock data for now)
        let comparables = [];
        try {
            const comparablesResponse = await fetch('/api/comparables', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (comparablesResponse.ok) {
                comparables = await comparablesResponse.json();
            }
        } catch (err) {
            console.warn('Failed to load comparables', err);
        }

        displayResults({
            ...prediction,
            comparables
        });

        // Show success message
        showAlert('Prediction completed successfully!', 'success');

    } catch (error) {
        console.error('Error:', error);
        showAlert('Failed to predict price. Please try again.', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

export function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        setTimeout(() => alertDiv.remove(), 5000);
    }
}
