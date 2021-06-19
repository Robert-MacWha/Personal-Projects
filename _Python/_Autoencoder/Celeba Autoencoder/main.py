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

def LoadDataset(size, display_template):
    if size == 0:
        pickle_in = open("dataset_min.pickle","rb")

    elif size == 1:
        pickle_in = open("dataset_mid.pickle","rb")

    elif size == 2:
        pickle_in = open("dataset.pickle","rb")

    dataset = np.asarray(pickle.load(pickle_in))

    if display_template:
        plt.imshow(dataset[0])
        plt.show()

    return dataset
        

def CreateEncoder(display_summary, optimizer, loss):
    i = Input( shape=(64, 64, 3, ) )

    x = Conv2D( 8, (3, 3), activation="relu", padding="same" )(i)
    x = MaxPooling2D( (2, 2) )(x)
    # Output size = (32, 32, 9)

    x = Conv2D( 16, (3, 3), activation="relu", padding="same" )(x)
    x = MaxPooling2D( (2, 2) )(x)
    # Output size = (16, 16, 16)

    x = Conv2D( 8, (3, 3), activation="relu", padding="same" )(x)
    x = MaxPooling2D( (2, 2) )(x)
    # Output size = (8, 8, 8)

    x = Flatten()(x)
    # Output size = (512)

    x = Dense( 512, activation="relu" )(x)
    x = Dense( 64, activation="sigmoid" )(x)        # Latent space ranges from 0 to 1  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    m = Model(i, x)
    m.compile( optimizer=optimizer, loss=loss )

    if ( display_summary ): print( m.summary() )

    return m

def CreateDecoder(display_summary, optimizer, loss):
    i = Input( shape=(64, ) )

    x = Dense( 512, activation="relu" )(i)

    x = Reshape( target_shape=(8, 8, 8) )(x)
    
    x = UpSampling2D( (2, 2) )(x)
    x = Conv2DTranspose( 16, (3, 3), activation="relu", padding="same" )(x)
    # Output shape = (16, 16, 8)

    x = Flatten()(x)
    # Output shape = (2048)

    x = Dense( 4096, activation="relu" )(x)
    x = Dense( 8192, activation="relu" )(x)

    x = Reshape( target_shape=(32, 32, 8) )(x)
    # Output shape = (32, 32, 8)

    x = UpSampling2D( (2, 2) )(x)
    x = Conv2DTranspose( 3, (3, 3), activation="sigmoid", padding="same" )(x)
    # Output shape = (64, 64, 3)

    m = Model(i, x)
    m.compile( optimizer=optimizer, loss=loss )

    if ( display_summary ): print( m.summary() )

    return m

def CreateAutoencoder(encoder, decoder, display_summary, optimizer, loss):
    i = Input( shape=(64, 64, 3, ) )

    x = encoder(i)

    x = decoder(x)

    m = Model(i, x)
    m.compile( optimizer=optimizer, loss=loss )

    if ( display_summary ): print( m.summary() )

    return m

def SampleDecodedQuality(epoch):
    # Predict the images from the given latent values
    sample = np.random.randint(0, dataset.shape[0], size=25)
    images = autoencoder.predict(dataset[sample])

    # Create a figure from the predicted images
    w, h = 64, 64
    cols, rows = 5, 5

    fig=plt.figure(figsize=(8, 8))

    for i in range(1, cols*rows +1):
        fig.add_subplot(rows, cols, i)
        plt.axis('off')
        plt.imshow(images[i-1])

    # Save the figure to the images dir
    plt.savefig(f"Images/Epoch #{epoch}")
    plt.close(fig)

def SaveModel(name, model):
    model.save(name)

def LoadModels(encoder_path, decoder_path):
    encoder = tf.keras.models.load_model(encoder_path)
    decoder = tf.keras.models.load_model(decoder_path)

    return encoder, decoder

def TrainAutoencoder(epochs, update_rate, batch_size, dataset):
    history = np.array((0))

    for e in range(epochs):
        epoch = (e * update_rate)
        print(f"Beginning Epoch #{epoch}")

        # Train the autoencoder for x epochs
        h = autoencoder.fit(dataset, dataset, epochs=epochs, batch_size=batch_size, verbose=0)

        history = np.append(history, h.history["loss"])

        SampleDecodedQuality(epoch)

        # Make a save of both models on this generation for backup purposes
        SaveModel(f"Models/Backup/Encoder/encoder_{epoch}", encoder)
        SaveModel(f"Models/Backup/Decoder/decoder_{epoch}", decoder)

    return history


# Used to trach how long the training process takes
start_time = time.time()

EPOCHS = 20                                            # How many times the network updates image and save outputs
UPDATE_RATE = 10                                       # How often the network updates image and save outputs
BATCH_SIZE = 1024                                      # Batch size for training
USE_OLD_MODELS = False

# Load a dataset (0 = min, 1 = mid, 2 = max)
print("Loading dataset")
dataset = LoadDataset(1, False)

print(f"Finished loading dataset in {start_time - time.time()} seconds")

if USE_OLD_MODELS:
    encoder, decoder = LoadModels("Models/Models-8/Encoder/encoder_90", "Models/Models-8/Decoder/decoder_90")
else:
    encoder = CreateEncoder(False, "Adam", "mse")
    decoder = CreateDecoder(False, "Adam", "mse")

autoencoder = CreateAutoencoder(encoder, decoder, True, "Adam", "mse")

start_time = time.time()
history = TrainAutoencoder(EPOCHS, UPDATE_RATE, BATCH_SIZE, dataset)
print(f"Finished training, completed {EPOCHS * UPDATE_RATE} epochs in {start_time - time.time()} seconds")

plt.plot(history)
plt.savefig("Images/Loss_Graph")