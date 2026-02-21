import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# ================= PATHS =================
BASE_DIR = "dataset/GTSRB"
MODEL_PATH = "model/traffic_sign_model.keras"
CSV_PATH = os.path.join(BASE_DIR, "Test.csv")
OUTPUT_PATH = "../frontend/traffic-sign-dashboard/public/confusion_matrix.png"

IMG_SIZE = (32, 32)

# ================= LOAD MODEL =================
model = load_model(MODEL_PATH)

# ================= LOAD CSV =================
df = pd.read_csv(CSV_PATH)

y_true = []
y_pred = []

# ================= LOOP THROUGH TEST DATA =================
for _, row in df.iterrows():

    img_path = os.path.join(BASE_DIR, row["Path"])

    if not os.path.exists(img_path):
        continue

    img = image.load_img(img_path, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array, verbose=0)
    predicted_class = np.argmax(prediction)

    y_pred.append(predicted_class)
    y_true.append(row["ClassId"])

print(f"Processed {len(y_true)} images")

# ================= CONFUSION MATRIX =================
cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(18, 16))
sns.heatmap(cm, cmap="viridis", square=True)
plt.title("Confusion Matrix – Traffic Sign Recognition")
plt.xlabel("Predicted Class")
plt.ylabel("True Class")

plt.savefig(OUTPUT_PATH, dpi=300, bbox_inches="tight")
plt.close()

print("✅ Confusion matrix saved successfully!")