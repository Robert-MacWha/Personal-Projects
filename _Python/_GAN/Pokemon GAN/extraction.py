import numpy as np
from PIL import Image

import glob
from tqdm import tqdm

# Directory of the raw images, the * char can be used to denote 'any'
IMAGE_DIRs = glob.glob("./animals/*.jpg")
# Directory the final .npy file will be saved to
OUTPUT_DIR = "./animal-dataset.mid.npy"
# Converts rgb images (0-255) to normalized images (0-1).  Better for ML
NORMALIZE_IMAGES = True
# Size of the raw images.  If image files are different sizes then all images will be forced to this single size
IMAGE_DIM = (128, 128, 3)

images = np.empty((10000, IMAGE_DIM[1], IMAGE_DIM[0], IMAGE_DIM[2]))

i = 0
for img_dir in tqdm(IMAGE_DIRs):
    image = Image.open(img_dir)                           # Load the image with pillow
    image = image.resize((IMAGE_DIM[0], IMAGE_DIM[1]))    # Resizes the images to be a uniform dim (x/y axis are fliped for PIL)

    image = np.array(image)                               # Converts image to np array
    image = np.reshape(image, (image.shape[0], image.shape[1], IMAGE_DIM[2]))

    if NORMALIZE_IMAGES:
        image = np.divide(image, 255)                     # Normalize image

    images[i] = image                                     # Add image to images np_array
    i += 1

    if i >= 10000:
        break


# Sample the image's shape so that we know it's turned out alright
print(images.shape)

# Save the images np_array with pickle
file = open(OUTPUT_DIR, 'wb')
np.save(OUTPUT_DIR, images)