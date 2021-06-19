#? load libraries
from IPython.display import display

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import random
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix # used for confusion matrix - nothing else

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Dropout, Flatten, Dense
from tensorflow.keras.utils  import plot_model

from tensorflow.python.client import device_lib
print(device_lib.list_local_devices())

#? load the dataset
DATA_DIR = 'D:\Projects\Python\Convolutional OCR\Mathematical Expression Classification\preprocessed_data_gradiant.npy'

"""
if not os.path.exists(DATA_DIR): # if the larger dataset doesn't exist then just load the smaller one
    DATA_DIR = './preprocessed_data.micro.npy'
"""

data = np.load(DATA_DIR)

print(data.shape)

#? preprocess the data
Xs = np.reshape(data, (-1, 28, 28, 1))

# create a y value of the correct type for each X value 
ys_indices = []
for i in range(data.shape[0]):
    for j in range(data[i].shape[0]):
        ys_indices.append(i)

ys_indices = np.asarray(ys_indices)

# convert the indices into 1-hot encodings
ys = np.zeros((ys_indices.size, ys_indices.max()+1))
ys[np.arange(ys_indices.size), ys_indices] = 1

print(Xs.shape)
print(ys.shape)

#? create a lable dictionary
# lables are in ASCII and can be decoded with the chr() function
LABEL_DIRECTORY = 'D:\Projects\Python\Convolutional OCR\Mathematical Expression Classification\dataset-mapping.txt'

label_map = pd.read_csv(LABEL_DIRECTORY,
                        delimiter = ' ', 
                        index_col=0, 
                        header=None, 
                        squeeze=True)

label_dictionary = {}
for index, label in enumerate(label_map):
    label_dictionary[index] = chr(label)

print(label_dictionary)

#? build a basic convolutional model
OUTPUT_DIM = 39

i = Input((28, 28, 1))

x = Conv2D(8, (2, 2), activation='relu')(i)
x = Dropout(0.3)(x)

x = Conv2D(16, (2, 2), activation='relu')(x)
x = Dropout(0.3)(x)

x = Conv2D(32, (2, 2), activation='relu')(x)
x = Dropout(0.3)(x)

x = Conv2D(64, (2, 2), activation='relu')(x)
x = Dropout(0.3)(x)

x = Conv2D(128, (2, 2), activation='relu')(x)
x = Dropout(0.3)(x)

x = Flatten()(x)

x = Dense(128, activation='relu')(x)
x = Dense(OUTPUT_DIM, activation='softmax')(x)

model = Model(i, x)
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

model.summary()

#? begin the training process
EPOCHS=30
BATCH_SIZE=32

# aug = ImageDataGenerator(rotation_range=10, zoom_range=0.2, width_shift_range=0.1, height_shift_range=0.1, shear_range=0.1, fill_mode="nearest")

# history = model.fit_generator(aug.flow(Xs, ys, batch_size=BATCH_SIZE), steps_per_epoch=len(Xs) // BATCH_SIZE, epochs=EPOCHS, shuffle=True)
history = model.fit(Xs, ys, batch_size=BATCH_SIZE, epochs=EPOCHS, shuffle=True, verbose=1)