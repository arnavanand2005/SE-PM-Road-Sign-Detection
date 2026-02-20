from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model", "traffic_sign_model.keras")

model = load_model(model_path)

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["file"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(img, (32, 32))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    class_id = int(np.argmax(prediction))

    return jsonify({"prediction": class_id})

if __name__ == "__main__":
    app.run(port=5001, debug=True)