from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)

# -----------------------------
# LOAD MODEL
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "model", "traffic_sign_model.keras")

model = load_model(model_path)

# -----------------------------
# CLASS LABELS
# -----------------------------
CLASS_NAMES = {
    0: "Speed limit (20km/h)",
    1: "Speed limit (30km/h)",
    2: "Speed limit (50km/h)",
    3: "Speed limit (60km/h)",
    4: "Speed limit (70km/h)",
    5: "Speed limit (80km/h)",
    6: "End of speed limit (80km/h)",
    7: "Speed limit (100km/h)",
    8: "Speed limit (120km/h)",
    9: "No passing",
    10: "No passing (trucks)",
    11: "Right-of-way at intersection",
    12: "Priority road",
    13: "Yield",
    14: "Stop",
    15: "No vehicles",
    16: "Vehicles over 3.5 tons prohibited",
    17: "No entry",
    18: "General caution",
    19: "Dangerous curve left",
    20: "Dangerous curve right",
    21: "Double curve",
    22: "Bumpy road",
    23: "Slippery road",
    24: "Road narrows",
    25: "Road work",
    26: "Traffic signals",
    27: "Pedestrians",
    28: "Children crossing",
    29: "Bicycles crossing",
    30: "Beware of ice/snow",
    31: "Wild animals crossing",
    32: "End speed + passing limits",
    33: "Turn right ahead",
    34: "Turn left ahead",
    35: "Ahead only",
    36: "Go straight or right",
    37: "Go straight or left",
    38: "Keep right",
    39: "Keep left",
    40: "Roundabout mandatory",
    41: "End of no passing",
    42: "End no passing (trucks)"
}

# -----------------------------
# PREDICT ROUTE
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Read image
    img_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({"error": "Invalid image"}), 400

    # -----------------------------
    # PREPROCESSING (CLEAN)
    # -----------------------------
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (32, 32))
    img = cv2.GaussianBlur(img, (3,3), 0)  # optional
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    # -----------------------------
    # PREDICTION
    # -----------------------------
    prediction = model.predict(img)[0]

    # Get top 5
    top5_indices = prediction.argsort()[-5:][::-1]

    best_idx = int(top5_indices[0])
    second_idx = int(top5_indices[1])

    best_conf = float(prediction[best_idx])
    second_conf = float(prediction[second_idx])

    # -----------------------------
    # 🔥 SPEED SIGN CORRECTION LOGIC
    # -----------------------------
    speed_classes = [0,1,2,3,4,5,7,8]

    if best_idx in speed_classes and second_idx in speed_classes:
        if abs(best_conf - second_conf) < 0.15:
            best_idx = second_idx
            best_conf = second_conf

    print("Prediction:", CLASS_NAMES[best_idx], best_conf)

    # Build top 5 response
    top5 = []
    for idx in top5_indices:
        top5.append({
            "class_id": int(idx),
            "label": CLASS_NAMES[int(idx)],
            "confidence": round(float(prediction[idx] * 100), 2)
        })

    return jsonify({
        "class_id": best_idx,
        "label": CLASS_NAMES[best_idx],
        "confidence": round(best_conf * 100, 2),
        "top5": top5
    })


# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(port=5001, debug=True)