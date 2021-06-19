from tensorflow.keras.preprocessing.image import ImageDataGenerator, array_to_img, img_to_array, load_img
import numpy as np

import glob
import os
from tqdm import tqdm

datagen = ImageDataGenerator(
        rotation_range=20,
        width_shift_range=0.1,
        height_shift_range=0.1,
        shear_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        fill_mode='nearest')

# paths to all raw images
IMAGE_DIRs = glob.glob("./pokemon/pokemon_jpg/*.jpg")
# dimensionality of images
IMAGE_DIM = (256, 256, 3)
# amount of new images generated for each old one
AUGMENTATION_FACTOR = 5

# empty the old folder
files = glob.glob('./pokemon/pokemon_augmented/*.jpg')
for f in files:
    os.remove(f)

j = 0
for img_dir in tqdm(IMAGE_DIRs):
    # load the image into a np array
    img = load_img(img_dir)
    x = img_to_array(img)
    x = x.reshape((1,) + x.shape)

    j += 1


    # create a bunch of variations of the image and save them to the augmented folder
    i = 0
    for batch in datagen.flow(x, batch_size=1,
                            save_to_dir='pokemon/pokemon_augmented', save_prefix=j, save_format='jpg'):
        i += 1
        if i >= AUGMENTATION_FACTOR:
            break  # otherwise the generator would loop indefinitely