from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

@app.route('/predict_withdrawal_risk', methods=['POST'])
def predict_withdrawal_risk():
    data = request.json
    # Implement logic for predicting withdrawal risk
    heart_rate = data.get('heart_rate')
    blood_pressure = data.get('blood_pressure')
    oxygen_level = data.get('oxygen_level')
    temperature = data.get('temperature')
    # Dummy logic for demonstration
    withdrawal_risk = (heart_rate + blood_pressure + oxygen_level + temperature) / 400
    return jsonify({"withdrawal_risk": withdrawal_risk})

@app.route('/analyze_mood', methods=['POST'])
def analyze_mood():
    data = request.json
    # Implement logic for mood analysis
    user_input = data.get('user_input')
    low_mood_words = ["depressed", "dark", "clouded", "anxious", "bad", "sad", "worried", "stress", "tired", "angry"]
    user_words = user_input.lower().split(" ")
    matched_words = [word for word in user_words if word in low_mood_words]
    mood_score = max(1 - len(matched_words) * 0.1, 0)
    return jsonify({"mood_score": mood_score})

if __name__ == '__main__':
    app.run(debug=True)
