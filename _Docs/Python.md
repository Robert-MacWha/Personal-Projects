# Python Projects
## Autoencoders
- [Autoencoders - Article Aid]()
- [Micro MNIST Autoencoder]()
- [Celeba Autoencoder]()
- [:star: Pong Generator]()

## Convolutional Networks
- [CNN CIFAR]()
- [RGB-Depth CNN]()
- [:star: CNN OCR]()

## Generative Adversarial Networks
- [MNIST GAN]()
- [Pokemon GAN]()

## Long-Short Term Memory Networks
- [Linear -> LSTM]()
- [MNIST RNN]()
- [Stock Predictor]()

## Reinforcement Learning
- [Acrobat Q Learning]()
- [MaRLio]()
- [PPO Test]()
- [:star: Reinforcement Learning - Article Aid]()
- [Reinforcement Learning Test]()

## Misc
- [Basic Linear Regression (First AI project!)]()
- [:star: Flowkey Web Scraper]()
- [Hashcode 2020 Problem]()
- [Movie Recommender]()
- [Spam Detector]()
- [Transfer Learning Test]()

### Autoencoders - Article Aid
A project created as a visual and code-based aid for an article I wrote on autoencoders. This project contains three unique autoencoders of varying levels of complexity, all trained on the MNIST dataset.
1. Single-layer Autoencoder
2. Multi-layer Autoencoder
3. Convolutional Autoencoder
Here is a [link](https://colab.research.google.com/drive/1DBOe9256acEyJ0rAjSohsm75oRHUmgJg?usp=sharing) to a live colab doc containing this project.

### Micro MNIST Autoencoder
An autoencoder trained on the MNIST dataset with the purpose of having the smallest possible encoding dimensionality.  After a significant amount of tweaking I was able to bring the encoding dimensionality down to just three parameters, meaning that the latent space can be visually plotted in thee dimensions.

Here is a [link](https://colab.research.google.com/drive/1VPmO35w70_phQUSSUIqhvYiFp5TnHgzZ?usp=sharing) to a live colab doc containing this project.

### Celeba Autoencoder
An autoencoder trained on the Celeba dataset with the purpose of being able to generate unique human faces.  While this autoencoder is able to effectively encode and decode real faces, and even make changes to those faces, I was unable to make it generate completely new faces.

Here is a [link](https://drive.google.com/drive/folders/1Ah_bEe5OuaQFJvAR0M5MajOO_qxWdtLd?usp=sharing) to a live colab doc containing this project.

### :star: Pong Generator
A large-scale project I created as an attempt to generate a fully-interactive game of Pong where the Input Management, Physics, and Rendering were all handled by AI.  This project was moderately successful if not extremely sensitive to changes. I was able to generate a video of a random agent playing within the AI-generated environment.  However, due to computational constraints I was unable to play in the AI environment myself.

The AI environment is made up of two distinct models - an engine and a renderer.  The engine is a feed-forward network that manages input management and physics interactions.  The renderer is the decoder portion of an autoencoder and manages converting the latent representation created by the engine and turning it into a sensical image.

Separate models were used for the renderer and engine portions because it allowed me to train them separately.  This meant that I could go over more iterations of different hyperparameters in less time.

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/1IERfi_D6OR623-C8V3DVgCRJYochLg_v?usp=sharing) to a google drive containing all the required files.

### CNN CIFAR
A convolutional classifier I created when learning about colvolutional neural networks.  This model is able to classify images from the CIFAR-10 dataset.

Here is a [link](https://colab.research.google.com/drive/1Tj-hKWnQukDV4l3lhaRbjqc_6WcKx7Qa?usp=sharing) to a live colab doc containing this project.

### RGB-Depth CNN
A convolutional -> depth CNN I created while interested in creating a self-driving car. While the results are a bit blurry I feel that this is relatively impressive given all the model is given is a single image.  The data for this project was gathered from [this github page](https://dimlrgbd.github.io/).

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/12R89YWmtvbmrewk7xrhWSZT7h2jcjin0?usp=sharing) to a google drive containing all the required files.

### :star: CNN OCR
A large-scale project I made as an attempt OCR on handwritten images.  I started this project before learning that this is still a relatively open problem in Machine Learning, so my lackluster results seem justified.

The bulk of this model is a convolutional classifier trained on the EMNIST Dataset and a dataset of [mathematical symbols](https://www.kaggle.com/xainano/handwrittenmathsymbols) I found on google.  I identify characters in images through hard-coded CSV magic and then pass the formatted images into the classifier.  This is the project's main limitation, as it only works on the most perfect cherry-picked input images.

I also attempted to use the ResNet model as a classifier to raise the accuracy.  While it did slightly increase the quality of my results the overall effect was net negative as the training times ballooned.

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/12R89YWmtvbmrewk7xrhWSZT7h2jcjin0?usp=sharing) to a google drive containing all the required files.

### MNIST GAN
A small project I created when first learning about GANs.  The script uses the MNIST dataset to train a GAN and create novel images that fit the same style.

Here is a [link](https://colab.research.google.com/drive/1AAd2j3OaNh0xNnZBmFIIE6tCOIy2uk7q?usp=sharing) to a live colab doc containing this project.

### Pokemon GAN
A small project I made further exploring GANS where I attempted to generate novel pokemon.  While the end-results of this project were relatively disappointing I believe that this is mainly due to the small amount of training data and the frankly outlandish designs.

Here is a [link](https://drive.google.com/drive/folders/1x3ggAbquVTcbedBBnkYgoos4ZiECSZ-A?usp=sharing) to a live colab doc containing this project.

### Linear -> LSTM
A project I created that compares the performance of models with varying degrees of memory.  Specifically, this project contains a linear model, a RNN, and a LSTM all being trained on the same dataset. The notebook goes on to show how RNNs are clearly superior thanks to their mix of being actually good and not taking forever to train.

Here is a [link](https://colab.research.google.com/drive/1gM1A7-JGxEGKp95WOd_OdtURjHrVofBn?usp=sharing) to a live colab doc containing this project.

### MNIST RNN
A project I creates that classifies MNIST images using an LSTM layer.  I'm not totally sure why I made this project seeing as LSTMs aren't made for this at all, but it works and I find it cool so I'm keeping it.

Other than using an LSTM this classifier is relatively straightforward and uses no special methodology or tricks.

Here is a [link](https://colab.research.google.com/drive/1Ab70YQly7XdifBauBEEIlCMiJMAPYP4d?usp=sharing) to a live colab doc containing this project.

### Stock Predictor
A RNN I created with the goals of either accurately predicting stocks or of showing the limitations of an LSTM.  I now point to this project whenever I find some novice AI enthusiast who wants to bet their life savings on their model.  LSTMs are very powerful and in the right situations they can predict very accurately, but the stock market is not one of those situations (at least, not for LSTMs created by you or I).  There are simply too many variables unaccounted for so the model is unable to make informed predictions.

If you know of anyone who needs to learn this lesson, here is a [link](https://colab.research.google.com/drive/1fsj9oKHIXI8u0UVtvF5hydxhMlaOt6gE?usp=sharing) to a live colab doc containing this project.

### Acrobat Q Learning

### MaRLio

### PPO Test

### Reinforcement Learning - Article Aid

### Reinforcement Learning Test

### Basic Linear Regression (First AI Project!)

### Flowkey Web Scraper

### Hashcode 2020 Problem

### Movie Recommender

### Spam Detector

### Transfer Learning Test
