from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import random
from datetime import datetime
import json
import os

app = Flask(__name__, static_folder='src', static_url_path='/src')
CORS(app)

# Mock trained model (in production, load actual trained model)
# from sklearn.ensemble import RandomForestRegressor
# model = pickle.load(open('models/price_predictor.pkl', 'rb'))

class MockPricePredictor:
    """Mock ML model for demo purposes"""
    
    def predict(self, features):
        """Generate price prediction based on input features"""
        # Base price calculation (mock, in INR)
        base_price = 3_500_000  # ₹3.5 lakh
        
        # Add price based on features
        price = base_price
        price += features['squareFeet'] * 1600  # per sqft
        price += features['bedrooms'] * 550000
        price += features['bathrooms'] * 300000
        price += (2024 - features['yearBuilt']) * (-5000) if features['yearBuilt'] < 2000 else (2024 - features['yearBuilt']) * (-2000)
        price += features['garage'] * 500000
        
        # Location adjustment (Indian cities)
        location_multiplier = {
            'mumbai': 1.8,
            'delhi': 1.6,
            'bangalore': 1.5,
            'hyderabad': 1.4,
            'chennai': 1.3,
            'pune': 1.35,
            'kolkata': 1.2,
            'gurgaon': 1.55,
            'noida': 1.45
        }
        
        city = features['location'].lower().split(',')[0].strip()
        multiplier = location_multiplier.get(city, 1.0)
        price *= multiplier
        
        return max(1_500_000, price)

predictor = MockPricePredictor()

@app.route('/api/predict', methods=['POST'])
def predict():
    """Handle price prediction requests"""
    try:
        data = request.get_json()
        
        # Validate input
        required_fields = ['squareFeet', 'bedrooms', 'bathrooms', 'yearBuilt', 'garage', 'location']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Prepare features
        features = {
            'squareFeet': float(data['squareFeet']),
            'bedrooms': int(data['bedrooms']),
            'bathrooms': int(data['bathrooms']),
            'yearBuilt': int(data['yearBuilt']),
            'garage': int(data['garage']),
            'location': data['location']
        }
        
        # Make prediction
        predicted_price = predictor.predict(features)
        
        # Calculate confidence and price range
        confidence = 82 + random.randint(-10, 15)
        price_range = predicted_price * 0.05
        
        response = {
            'price': float(predicted_price),
            'minPrice': float(predicted_price - price_range),
            'maxPrice': float(predicted_price + price_range),
            'confidence': int(confidence),
            'features': features,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/market-trends', methods=['GET'])
def market_trends():
    """Return market trend data"""
    trends = {
        'trend': 'upward',
        'yoyGrowth': 8.5,
        'momentum': 'strong',
        'marketData': {
            'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            # Average prices are in INR (lakhs/crores scale)
            'avgPrices': [3850000, 3880000, 3920000, 3950000, 3980000, 4020000]
        }
    }
    return jsonify(trends), 200

@app.route('/api/comparables', methods=['POST'])
def comparables():
    """Return comparable properties"""
    data = request.get_json()
    
    comparables = [
        {
            'id': 1,
            'address': '123 Oak Street, Springfield',
            'sqft': 2400,
            'price': 4800000,
            'similarity': 92
        },
        {
            'id': 2,
            'address': '456 Maple Ave, Springfield',
            'sqft': 2550,
            'price': 4950000,
            'similarity': 88
        },
        {
            'id': 3,
            'address': '789 Pine Road, Springfield',
            'sqft': 2350,
            'price': 4750000,
            'similarity': 90
        }
    ]
    
    return jsonify(comparables), 200

@app.route('/api/analytics', methods=['GET'])
def analytics():
    """Return analytics data"""
    analytics_data = {
        'avgPrice': 4250000,
        'marketTrend': '+4.2%',
        'propertiesListed': 1245,
        'avgDaysOnMarket': 28,
        'priceToListRatio': 98.2
    }
    return jsonify(analytics_data), 200

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'service': 'Home Price Predictor'}), 200

@app.route('/')
def index():
    """Serve the main index.html"""
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    print("Home Price Predictor Server Running on http://localhost:5000")
    print("Frontend: http://localhost:5173")
    app.run(debug=True, port=5000)
