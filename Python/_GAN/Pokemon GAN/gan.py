import os
import sys
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Dropout, Flatten, Reshape
from tensorflow.keras.layers import Conv2D, MaxPool2D, UpSampling2D, Conv2DTranspose, BatchNormalization
from tensorflow.keras.layers import LeakyReLU
from tensorflow.keras.optimizers import Adam, RMSprop
from tensorflow.keras import backend

from tqdm import tqdm
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
import glob

LATENT_SPACE     = 128
EPOCHS           = 5000
BATCH_SIZE       = 16
SAMPLE_FREQUENCY = 100
SAMPLE_QUANTITY  = 20
NAME             = 'GAN 128x(256x256) 3.1-mid_model'

# set the seed to a consistant value
np.random.seed(1)
tf.random.set_seed(1)

Path(f'results/{NAME}').mkdir(parents=True, exist_ok=True)
# delete any files in the name directory
files = glob.glob(os.path.join(f"results/{NAME}", "**/*"), recursive=True)
files = [f for f in files if os.path.isfile(f)]
for file in files:
    os.remove(file)

Path(f'results/{NAME}/images').mkdir(parents=True, exist_ok=True)
Path(f'results/{NAME}/models').mkdir(parents=True, exist_ok=True)
 
# implementation of wasserstein loss
def wasserstein_loss(y_true, y_pred):
	return backend.mean(y_true * y_pred)

def buildGenerator(summary=False):

    i = Input( shape=(LATENT_SPACE, ) )

    x = Dense( LATENT_SPACE)(i)
    x = LeakyReLU(0.2)(x)

    x = Dense( LATENT_SPACE)(x))
    x = LeakyReLU(0.2)(x)

    x = BatchNormalization(momentum=0.9)(x)

    x = Reshape( target_shape=(4, 4, 8) )(x)

    x = Dropout(0.4)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( 1024, 3, padding='same')(x)
    x = LeakyReLU(0.2)(x)
    x = BatchNormalization(momentum=0.9)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( 512, 3, padding='same')(x)
    x = LeakyReLU(0.2)(x)
    x = BatchNormalization(momentum=0.9)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( 256 , 3, padding='same')(x)
    x = LeakyReLU(0.2)(x)
    x = BatchNormalization(momentum=0.9)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( 128 , 3, padding='same')(x)
    x = LeakyReLU(0.2)(x)
    x = BatchNormalization(momentum=0.9)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( 64 , 3, padding='same')(x)
    x = LeakyReLU(0.2)(x)
    x = BatchNormalization(momentum=0.9)(x)

    x = UpSampling2D()(x)
    x = Conv2DTranspose( 3  , 3, padding='same', activation="sigmoid")(x)

    model = Model(i, x)
    if (summary):
        print(model.summary())

    return model

def buildDiscriminator(summary=False):

    i = Input( shape=(256, 256, 3) )

    x = Conv2D( filters=128, kernel_size=5, strides=2, padding='same')(i)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=64, kernel_size=5, strides=2, padding='same')(i)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=32, kernel_size=5, strides=2, padding='same')(x)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=16, kernel_size=5, strides=2, padding='same')(x)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=8 , kernel_size=5, strides=2, padding='same')(x)
    x = LeakyReLU(0.2)(x)

    x = Conv2D( filters=1 , kernel_size=5, strides=2, padding='same')(x)
    x = LeakyReLU(0.2)(x)

    x = Flatten()(x)

    x = Dense( 1, activation='sigmoid' )(x)

    model = Model(i, x)
    if (summary):
        print(model.summary())

    return model

def loadTrainingImages(source="animal-dataset.npy"):
    images = np.load(source)

    return images

def sampleImages(epoch, dim=5):
    rows, cols = dim, dim
    noise = np.random.normal(size=(rows * cols, LATENT_SPACE))
    images = generator.predict(noise)

    fig, axs = plt.subplots(rows, cols)
    idx = 0
    for i in range(rows):
        for j in range(cols):
            axs[i, j].imshow(images[idx])
            axs[i, j].axis('off')
            idx += 1
    fig.savefig(f'results/{NAME}/images/{epoch}.png')
    plt.close()

# build the generator and discriminator ------------------------------------------------------------------------------------------------------------------------
generator     = buildGenerator(True)
discriminator = buildDiscriminator(True)

discriminator.compile(
    loss='binary_crossentropy',
    optimizer = Adam(lr=0.0003, beta_1=0.5)
)

# build the GAN        -----------------------------------------------------------------------------------------------------------------------------------------
i = Input( shape=(LATENT_SPACE) )
x = generator(i)

discriminator.trainable = False

x = discriminator(x)

gan = Model(i, x)
gan.compile(
    loss='binary_crossentropy',
    optimizer = Adam(lr=0.0003, beta_1=0.5)
)
# print(gan.summary())

# load images          -----------------------------------------------------------------------------------------------------------------------------------------
images = loadTrainingImages('dataset.max.npy')
print('Training images:', images.shape)

# begin training the GAN -----------------------------------------------------------------------------------------------------------------------------------------
ones  = np.ones(BATCH_SIZE) * 0.9
zeros = np.ones(BATCH_SIZE) * 0.1

d_loss = []
g_loss = []

for e in tqdm(range(1, EPOCHS+1)):
    
        # Train the discriminator -----------------------------------------------------------------------------------------------------------------------------------------
    # select a random batch of the training images
    idx = np.random.randint(0, images.shape[0], BATCH_SIZE)
    real_images = images[idx]
    
    # generate an equal amount of fake images with the generator
    noise = np.random.normal(size=(BATCH_SIZE, LATENT_SPACE))
    fake_images = generator.predict(noise)

    # fit the discriminator
    r1 = discriminator.fit(real_images, ones , verbose=0, batch_size=BATCH_SIZE)
    r2 = discriminator.fit(fake_images, zeros, verbose=0, batch_size=BATCH_SIZE)

    # record the discriminator's loss
    d_loss.append((r1.history['loss'][0] + r2.history['loss'][0]) / 2)

        # Train the generator     -----------------------------------------------------------------------------------------------------------------------------------------
    noise = np.random.normal(size=(BATCH_SIZE, LATENT_SPACE))

    r = gan.fit(noise, ones, verbose=0, batch_size=BATCH_SIZE)

    # record the generator's loss
    g_loss.append(r.history['loss'])

        # Sample the generator    -----------------------------------------------------------------------------------------------------------------------------------------
    if (e % SAMPLE_FREQUENCY == 0):
        sampleImages(e, dim=SAMPLE_QUANTITY)

# plot the generator and discriminator's losses over time
plt.plot(d_loss, label='discriminator')
plt.legend(loc=1)
plt.savefig(f'results/{NAME}/d_loss.pdf')
plt.savefig(f'results/{NAME}/d_loss.png')
plt.cla()

plt.plot(g_loss, label='generator')
plt.legend(loc=1)
plt.savefig(f'results/{NAME}/g_loss.pdf')
plt.savefig(f'results/{NAME}/g_loss.png')
plt.cla()

plt.plot(d_loss, label='discriminator')
plt.plot(g_loss, label='generator')
plt.legend(loc=1)
plt.savefig(f'results/{NAME}/loss.pdf')
plt.savefig(f'results/{NAME}/loss.png')
plt.show()