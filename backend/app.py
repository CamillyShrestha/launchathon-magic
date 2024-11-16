from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import joblib
import openai
import nltk
from nltk.tokenize import word_tokenize
import re

# Load the pre-trained withdrawal risk model
model = joblib.load('rm.pkl')

# Set up OpenAI API key
openai.api_key = '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'

# Initialize NLTK
nltk.download('punkt')

# Define trigger words with their scores
TRIGGER_WORDS_SCORES = {
    "depressed": 3,
    "dark": 2,
    "clouded": 2,
    "anxious": 3,
    "feel bad": 2,
    "hopeless": 4,
    "sad": 2,
    "stressed": 3,
    "down": 2,
    "unhappy": 2,
    "angry": 3,
    "helpless": 4,
    "worthless": 4,
    "overwhelmed": 3,
    "fearful": 3
}
ALERT_THRESHOLD = 15

# Define feature names for the updated withdrawal risk predictor
FEATURE_NAMES = ['HRV', 'Age', 'Gender', 'PreviousRelapses', 'COWS', 'OxygenLevel']

app = Flask(__name__)

# Function to detect trigger words and calculate scores
def detect_trigger_words_and_score(text):
    tokens = word_tokenize(text.lower())
    tokens = [re.sub(r'\W+', '', token) for token in tokens]
    
    total_score = 0
    detected_words = []
    
    for token in tokens:
        if token in TRIGGER_WORDS_SCORES:
            detected_words.append(token)
            total_score += TRIGGER_WORDS_SCORES[token]
    
    return detected_words, total_score

# Function to generate a response using GPT
def generate_response(user_input, detected_words):
    if detected_words:
        prompt = f"""
        The user mentioned feeling {', '.join(detected_words)}.
        Please respond with empathy and provide supportive advice or resources.
        """
    else:
        prompt = f"The user said: '{user_input}'. Respond appropriately."
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an empathetic and supportive chatbot."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=100,
        temperature=0.7
    )
    
    return response['choices'][0]['message']['content'].strip()

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')

# Route for withdrawal risk prediction
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    vital_signs = [
        data['HRV'],
        data['Age'],
        data['Gender'],
        data['PreviousRelapses'],
        data['COWS'],
        data['OxygenLevel']
    ]
    # Convert the input into a pandas DataFrame
    features_df = pd.DataFrame([vital_signs], columns=FEATURE_NAMES)
    
    # Make a prediction using the loaded model
    risk_score = model.predict(features_df)[0]
    return jsonify({'risk_score': round(risk_score, 2)})

# Route for chatbot interaction
@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    detected_words, total_score = detect_trigger_words_and_score(user_input)
    response = generate_response(user_input, detected_words)
    
    return jsonify({
        'response': response,
        'alert': total_score > ALERT_THRESHOLD
    })

if __name__ == '__main__':
    app.run(debug=True)