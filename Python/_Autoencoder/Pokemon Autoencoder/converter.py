import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import tensorflowjs as tfjs
from tensorflow import keras
import numpy as np

NAME = '(128x128) 0.7-AE-animals'
MODEL_ID = 15000
IMAGE_GRANULARITY = 2000

# Grab saved models
encoder = keras.models.load_model(f'results/{NAME}/models/{MODEL_ID}-encoder.h5')
decoder = keras.models.load_model(f'results/{NAME}/models/{MODEL_ID}-decoder.h5')

# Convert models into json format and save them
tfjs.converters.save_keras_model(encoder, 'final/JS_encoder')
tfjs.converters.save_keras_model(decoder, 'final/JS_decoder')

# load the image dataset
dataset = np.load('dataset-pokemon-128.mid.npy')

# get the latent representations of x images
idxs = np.random.randint(0, dataset.shape[0], IMAGE_GRANULARITY)
latent_reps = encoder.predict(dataset[idxs])
single_latent_rep = encoder.predict([dataset[[3, 4]]])

print(latent_reps.shape)

# get the ranges for each latent dim of the images
latent_ranges = np.zeros((latent_reps.shape[1], 2))
for i in range(latent_reps.shape[1]):
    latent_ranges[i][0] = 1

    for j in range(IMAGE_GRANULARITY):
        if latent_reps[j][i] < latent_ranges[i][0]:
            latent_ranges[i][0] = latent_reps[j][i]

        if latent_reps[j][i] > latent_ranges[i][1]:
            latent_ranges[i][1] = latent_reps[j][i]

# save the array of ranges to a txt file
np.savetxt('final/latent_ranges.txt', latent_ranges)

# get the averages for each latent item
latent_avgs = np.zeros((latent_reps.shape[1]))
for i in range(latent_reps.shape[1]):
    latent_avgs[i] = np.average(latent_reps[:][i]);

np.savetxt('final/latent_averages.txt', latent_avgs)

# get the standard deviations for each latent item
latent_std = np.zeros(latent_reps.shape[1])
for i in range(latent_reps.shape[1]):
    latent_std[i] = np.std(latent_ranges[:][i])

np.savetxt('final/latent_stds.txt', latent_std)

# get a single image's latent dim
single_item = np.zeros(single_latent_rep.shape[1])
for i in range(single_latent_rep.shape[1]):
    single_item[i] = single_latent_rep[0][i]

np.savetxt('final/single_item.txt', single_item)