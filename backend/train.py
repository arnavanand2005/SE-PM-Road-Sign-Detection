import os
import cv2
import numpy as np
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split

# -----------------------------
# LOAD DATA
# -----------------------------
data = []
labels = []

train_path = "dataset/GTSRB/Train"

print("Loading dataset...")

for class_id in range(43):
    path = os.path.join(train_path, str(class_id))
    
    for img_name in os.listdir(path):
        img_path = os.path.join(path, img_name)
        
        image = cv2.imread(img_path)
        if image is None:
            continue
        
        image = cv2.resize(image, (32, 32))
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        data.append(image)
        labels.append(class_id)

data = np.array(data, dtype="float32") / 255.0
labels = to_categorical(labels, 43)

print("Dataset loaded:", data.shape)

# -----------------------------
# SPLIT
# -----------------------------
X_train, X_val, y_train, y_val = train_test_split(
    data, labels,
    test_size=0.2,
    random_state=42,
    shuffle=True
)

# -----------------------------
# 🔥 DATA AUGMENTATION (REAL-WORLD FIX)
# -----------------------------
datagen = ImageDataGenerator(
    rotation_range=5,
    zoom_range=0.05,
    width_shift_range=0.05,
    height_shift_range=0.05
)

datagen.fit(X_train)

# -----------------------------
# MODEL (IMPROVED)
# -----------------------------
model = Sequential([

    Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3)),
    BatchNormalization(),
    MaxPooling2D(),

    Conv2D(64, (3,3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(),

    Conv2D(128, (3,3), activation='relu'),
    BatchNormalization(),
    MaxPooling2D(),

    Flatten(),

    Dense(256, activation='relu'),
    Dropout(0.5),

    Dense(43, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()

# -----------------------------
# TRAIN
# -----------------------------
early_stop = EarlyStopping(
    monitor="val_loss",
    patience=7,
    restore_best_weights=True
)

print("Training...")

model.fit(
    datagen.flow(X_train, y_train, batch_size=64),
    epochs=30,
    validation_data=(X_val, y_val),
    callbacks=[early_stop]
)

# -----------------------------
# SAVE
# -----------------------------
os.makedirs("model", exist_ok=True)
model.save("model/traffic_sign_model.keras")

print("✅ Model trained successfully!")