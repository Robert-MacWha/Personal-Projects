import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import time
import sys

import tensorflow as tf
import tensorflow.python.util.deprecation as deprecation
deprecation._PRINT_DEPRECATION_WARNINGS = False

from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Activation, Conv2D, MaxPool2D, Flatten, Reshape, Conv2DTranspose, UpSampling2D, Concatenate

import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm

def loadData():
    # load npy data from "D:\Datasets\RGB - Depth Dataset"
    start_time = time.time()
    Xs = np.load("D:/Datasets/RGB - Depth Dataset/lr_color_normalized.npy")
    ys = np.load("D:/Datasets/RGB - Depth Dataset/lr_depth_normalized.npy")
    print(f"Loaded dataset in {time.time() - start_time}s")

    return (Xs, ys)

INPUT_SHAPE = (288, 512, 3)

def sampleModelQuality(directory, Xs, ys, amount, model, epoch):
    # select a batch of amount images
    batch = np.random.randint(Xs.shape[0], size=amount)

    # the depth maps for those images, and the predicted depth maps
    depths = np.reshape(ys[batch], (amount, 288, 512))
    predictions = np.reshape(model.predict(Xs[batch]), (amount, 288, 512))

    # combine the predicted and original arrays
    images = np.concatenate((depths, predictions))

    # Create a figure from the predicted and real images
    cols, rows = amount, 2

    fig=plt.figure(figsize=(amount, 2))

    for i in range(1, cols*rows +1):
        fig.add_subplot(rows, cols, i)
        plt.axis('off')
        plt.imshow(images[i-1])

    # Save the figure to the images dir
    plt.savefig(f"{directory}/Epoch #{epoch}")
    plt.close(fig)

def sampleModelDifferences(directory, Xs, ys, amount, model):
    # select a batch of amount images
    batch = np.random.randint(Xs.shape[0], size=amount)

    # the depth maps for the batch, and the predicted depth maps
    depths = np.reshape(ys[batch], (amount, 288, 512))
    predictions = np.reshape(model.predict(Xs[batch]), (amount, 288, 512))

    # calculate the difference between the ground truth and the predictions
    differences = np.absolute(np.subtract(depths, predictions))

    images = np.concatenate((depths, differences, predictions))

    # Create a figure of these differences
    cols, rows = amount, 3

    fig=plt.figure(figsize=(amount, 3))

    for i in range(1, cols*rows +1):
        fig.add_subplot(rows, cols, i)
        plt.axis('off')
        plt.imshow(images[i-1])

    # Save the figure to the images dir
    plt.savefig(f"{directory}/_differences")
    plt.close(fig)

def createModel():
    # create the model
    i = Input(shape = INPUT_SHAPE)
    x = i

    x = Conv2D(32, (3, 3), padding = "same")(x)
    x = Activation("relu")(x)

    x = Conv2D(64, (3, 3), padding = "same")(x)
    x = Activation("relu")(x)

    x = Conv2D(64, (3, 3), padding = "same")(x)
    x = Activation("relu")(x)

    x = Conv2D(32, (3, 3), padding = "same")(x)
    x = Activation("sigmoid")(x)

    x = Conv2D(1, (3, 3), padding = "same")(x)
    x = Activation("sigmoid")(x)

    model = Model(i, x)

    print(model.summary())

    model.compile(optimizer="adam", loss="mse")

    return model

def loadModel(model_name):
    model = tf.keras.models.load_model(f"models/{model_name}")
    return model

Xs, ys = loadData()

MODEL_NAME = "0.5x_input__512x2_dense"
# create the logs dir if necessary
logs_dir = f"logs/{MODEL_NAME}"
if not os.path.exists(logs_dir):
    os.mkdir(logs_dir)

# create the image dir if necissary
images_dir = f"{logs_dir}/_images"
if not os.path.exists(images_dir):
    os.mkdir(images_dir)

# create the model dir if necissary
model_dir = f"models/{MODEL_NAME}"
if not os.path.exists(model_dir):
    os.mkdir(model_dir)

# create the lite model dir if necissary
lite_model_dir = f"models/lite"
if not os.path.exists(model_dir):
    os.mkdir(model_dir)

# load in the model
model = createModel()

# train the model
EPOCHS = 1000
BATCH_SIZE = 128
UPDATE_EVERY = 50

hist_loss = []

model.fit(Xs, ys, epochs=EPOCHS, batch_size=BATCH_SIZE)

"""
for e in tqdm(range(EPOCHS)):
    # sample the Xs and ys to create a batch
    ids = np.random.choice(Xs.shape[0], BATCH_SIZE)
    x_batch = Xs[ids]
    y_batch = ys[ids]

    # train the model on the random batch
    history = model.train_on_batch(x_batch, y_batch)

    if (e % UPDATE_EVERY == 0):
        # append the accuracy and loss to the hist lists
        loss = history

        hist_loss.append(loss)

        # generate & save some sample images from the training process
        sampleModelQuality(images_dir, Xs, ys, 10, model, e)
"""

# save the model
model.save(model_dir)

# create a image displaying the differences in the predictions vs the truth
sampleModelDifferences(logs_dir, Xs, ys, 10, model)

# save the loss and accuracy logs
np.save(f"{logs_dir}/loss", hist_loss)

# draw the graphs for the loss and accuracy
plt.plot(np.asarray(hist_loss))
plt.title('Model Loss over time')

plt.savefig(f"{logs_dir}/_graph")
plt.show()