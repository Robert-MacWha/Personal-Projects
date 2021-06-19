import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow as tf
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
  try:
    # Currently, memory growth needs to be the same across GPUs
    for gpu in gpus:
      tf.config.experimental.set_memory_growth(gpu, True)
    logical_gpus = tf.config.experimental.list_logical_devices('GPU')
    print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
  except RuntimeError as e:
    # Memory growth must be set before GPUs have been initialized
    print(e)

print('-'*50)

from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Reshape, Flatten
from tensorflow.keras.layers import Conv2D, Conv2DTranspose, UpSampling2D
from tensorflow.keras.layers import LeakyReLU, BatchNormalization, Dropout
from tensorflow.keras.activations import sigmoid
from tensorflow.keras.utils import plot_model
from tensorflow.keras.optimizers import Adam

from tqdm import tqdm
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import shutil
import time

VERSION = 0.7
NAME = f'(128x128) {VERSION}-AE-animals-larger_lr'
IMAGE_LOG_DIM = 10 # square root of the # of images generated when sampling the quality of the decoder
EPOCHS = 15000 
BATCH_SIZE = 32
SAMPLE_FREQUENCY = 500
SAVE_FREQUENCY = 1000
SMOOTHING_FACTOR = 200

# set the seed to a consistant value
np.random.seed(1)
tf.random.set_seed(1)

def initializeFileStructure():
    # delete possible old directory
    try:
        shutil.rmtree(f'results/{NAME}')
    except OSError as e:
        print('No old directory found')

    # make the parent directory
    Path(f'results/{NAME}').mkdir(parents=True, exist_ok=True)

    # make the children directories if required
    Path(f'results/{NAME}/images').mkdir(parents=True, exist_ok=True)
    Path(f'results/{NAME}/models').mkdir(parents=True, exist_ok=True)

def createEncoder(summary=False, plot=True):
    i = Input( shape=(128, 128, 3) )

    x = Conv2D( filters=512, kernel_size=4, strides=2, padding='same' )(i)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=256, kernel_size=4, strides=2, padding='same' )(x)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=128, kernel_size=4, strides=2, padding='same' )(x)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=64 , kernel_size=4, strides=2, padding='same' )(x)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=16 , kernel_size=4, strides=2, padding='same' )(x)
    x = LeakyReLU(0.2)(x)

    x = Flatten()(x)
    
    x = Dense(256)(x)
    x = LeakyReLU(0.2)(x)

    x = Dense( 64, activation='sigmoid' )(x)

    model = Model(i, x)
    if summary:
        print(model.summary())
    if plot:
        plot_model( model, to_file=f'results/{NAME}/models/_encoder-{model.count_params():,d}.png', show_shapes=True )

    return model

def createDecoder(summary=False, plot=True):
    i = Input( shape=(64) )
    x = Dropout(0.2)(i)

    x = Dense(64)(x)
    x = LeakyReLU(0.2)(x)
    x = Dropout(0.2)(x)

    x = Dense(256)(x)
    x = LeakyReLU(0.2)(x)

    x = Reshape( target_shape=(4, 4, 16) )(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( filters=1024, kernel_size=4, strides=1, padding='same' )(x)
    x = LeakyReLU(0.2)(x)
    x = Dropout(0.2)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( filters=512, kernel_size=4, strides=1, padding='same' )(x)
    x = LeakyReLU(0.2)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( filters=256, kernel_size=4, strides=1, padding='same' )(x)
    x = LeakyReLU(0.2)(x)
    x = Dropout(0.2)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( filters=128, kernel_size=4, strides=1, padding='same' )(x)
    x = LeakyReLU(0.2)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( filters=3 , kernel_size=4, strides=1, padding='same', activation='sigmoid' )(x)

    model = Model(i, x)
    if summary:
        print(model.summary())
    if plot:
        plot_model( model, to_file=f'results/{NAME}/models/_decoder-{model.count_params():,d}.png', show_shapes=True )

    return model

def loadTrainingImages(source="dataset-animal.min.npy"):
    images = np.load(source)

    return images

def saveModels(epoch):
    encoder.save(f'results/{NAME}/models/{epoch}-encoder.h5')
    decoder.save(f'results/{NAME}/models/{epoch}-decoder.h5')

def sampleImages(epoch, idxs):
    rows, cols = IMAGE_LOG_DIM, IMAGE_LOG_DIM
    images = autoencoder.predict(dataset[idxs])

    fig, axs = plt.subplots(rows, cols)
    idx = 0
    for i in range(rows):
        for j in range(cols):
            axs[i, j].imshow(images[idx])
            axs[i, j].axis('off')
            idx += 1
    fig.savefig(f'results/{NAME}/images/{epoch}.png')
    plt.close()

startTime = time.time()

initializeFileStructure()
encoder = createEncoder()
decoder = createDecoder()

i = Input( shape=(128, 128, 3) )
x = encoder(i)
x = decoder(x)

autoencoder = Model(i, x)
autoencoder.compile(
    loss="binary_crossentropy",
    optimizer=Adam(lr=0.0002, beta_1 = 0.5),
    metrics=['accuracy']
)
print(f'Compiled models in {time.time()-startTime}s')
startTime = time.time()

dataset = loadTrainingImages('dataset-animal.max.npy')
idxs = np.random.randint(0, dataset.shape[0], IMAGE_LOG_DIM*IMAGE_LOG_DIM)
print(f'Loaded dataset with shape: {dataset.shape} in  {time.time()-startTime}s')  

loss_history = []
accuracy_history = []

for e in tqdm(range(1, EPOCHS+1)):
    # train the autoencoder
    idx = np.random.randint(0, dataset.shape[0], BATCH_SIZE)
    images = dataset[idx]
    r = autoencoder.fit(images, images, batch_size = BATCH_SIZE, verbose=0)

    loss_history.append(r.history['loss'][0])
    accuracy_history.append(r.history['accuracy'][0])

    if e % SAMPLE_FREQUENCY == 0:
        sampleImages(e, idxs)
    if e % SAVE_FREQUENCY == 0:
        saveModels(e)

smooth_loss_history = []
smooth_accuracy_history = []

for i in range(SMOOTHING_FACTOR, len(loss_history)):
    loss_avg = 0
    for j in range(-SMOOTHING_FACTOR, 0):
        loss_avg += loss_history[i + j]
    loss_avg /= SMOOTHING_FACTOR
    smooth_loss_history.append(loss_avg)

    accuracy_avg = 0
    for j in range(-SMOOTHING_FACTOR, 0):
        accuracy_avg += accuracy_history[i + j]
    accuracy_avg /= SMOOTHING_FACTOR
    smooth_accuracy_history.append(accuracy_avg)

# plot the loss and accuracy over time
plt.plot(smooth_loss_history, label='loss')
plt.plot(smooth_accuracy_history, label='accuracy')
plt.legend(loc=1)
plt.savefig(f'results/{NAME}/_loss.pdf')
plt.savefig(f'results/{NAME}/_loss.png')
plt.show()