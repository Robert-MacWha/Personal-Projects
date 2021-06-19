import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow.python.util.deprecation as deprecation
deprecation._PRINT_DEPRECATION_WARNINGS = False

# ↑ Used to remove warning and info messages from tensorflow ↑

import pickle
import numpy as np
import time
import matplotlib.pyplot as plt

import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Dropout, Flatten, Reshape
from tensorflow.keras.layers import Conv2D, Conv2DTranspose, MaxPooling2D, UpSampling2D

def LoadDataset():
    pickle_in = open("dataset_mid.pickle","rb")
    dataset = np.asarray(pickle.load(pickle_in))

    return dataset

def LoadModels(encoder_path, decoder_path):
    encoder = tf.keras.models.load_model(encoder_path)
    decoder = tf.keras.models.load_model(decoder_path)

    return encoder, decoder

def GenerateImageDisplay(images):
    # Create a figure from the predicted images
    w, h = 64, 64
    cols, rows = 5, 5

    fig=plt.figure(figsize=(8, 8))

    for i in range(1, cols*rows +1):
        fig.add_subplot(rows, cols, i)
        plt.axis('off')
        plt.imshow(images[i-1])

    # Save the figure to the images dir
    plt.savefig("Test")
    plt.close(fig)


dataset = LoadDataset()

encoder, decoder = LoadModels("Models\Models-9\Encoder\encoder_210", "Models\Models-9\Decoder\decoder_210")

# Get all encoded representations
encoded_reps = np.array((dataset.shape[0], 64))

print(dataset.shape)

for i in range(dataset.shape[0]):
    encoded_reps[i] = encoder.predict(dataset[i])

# Get the ranges of ranges of the encoded reps
encoded_ranges = np.array((64, 2))

for i in range(64):
    encoded_ranges[i][0] = np.amin(encoded_ranges[:][i])
    encoded_ranges[i][1] = np.amax(encoded_ranges[:][i])

# Generate a random uniform set of latent dims centered around the ranges
latent_samples = numpy.random.normal(size=(25, 64)) + 0.5

for i in range(64):
    # Recast the range from 0-1 to min-max (add min, multiply by remaining required difference)
    latent_samples[:][i] = encoded_ranges[i][0] + ( (np.amax(encoded_ranges[:][i]) - np.amin(encoded_ranges[:][i])) *  latent_samples[:][i])

print(latent_samples.shape)
images = decoder.predict(latent_samples)

GenerateImageDisplay(images)