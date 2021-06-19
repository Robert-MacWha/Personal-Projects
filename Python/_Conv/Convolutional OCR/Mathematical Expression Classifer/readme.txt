The following paper was followed to create the basic OCR framework:
https://www.researchgate.net/publication/333539203_A_Tutorial_on_Optical_Character_Recognition_in_Mathematical_Domain#pf5

This paper also contains links to both the EMNIST and Handwritten math symbols datasets

This repository comes with a dataset ('preprocessed_data.micro.npy') what contains 200 images from each of the 46 categories.  This dataset is a formated .npy file of shape (46, [x], 784) where x is the number of images per category.