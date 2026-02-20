import os
import cv2
import numpy as np
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

data = []
labels = []

train_path = "dataset/GTSRB/Train"

for class_id in range(43):
    path = os.path.join(train_path, str(class_id))
    for img in os.listdir(path):
        img_path = os.path.join(path, img)
        image = cv2.imread(img_path)
        image = cv2.resize(image, (32, 32))
        data.append(image)
        labels.append(class_id)

data = np.array(data) / 255.0
labels = to_categorical(labels, 43)

model = Sequential([
    Conv2D(32, (3,3), activation='relu', input_shape=(32,32,3)),
    MaxPooling2D(),
    Conv2D(64, (3,3), activation='relu'),
    MaxPooling2D(),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(43, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(data, labels, epochs=10, batch_size=64, validation_split=0.2)

model.save("model/traffic_sign_model.h5")

print("Model trained and saved successfully!")