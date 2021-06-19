# Python Projects
## Autoencoders
- [Autoencoders - Article Aid]()
- [Celeba Autoencoder]()
- [Micro MNIST Autoencoder]()
- [:star: Pong Generator]()
## Convolutional Networks
- [CNN CIFAR]()
- [:star: CNN OCR]()
- [RGB-Depth CNN]()
## Generative Adversarial Networks
- [MNIST GAN]()
- [Pokemon GAN]()
## Long-Short Term Memory Networks
- [Linear LSTM]()
- [MNIST RNN]()
- [Simple RNN]()
- [Stock Predictor]()
## Misc
- [Basic Linear Regression (First AI project!)]()
- [:star: Flowkey Web Scraper]()
- [Hashcode 2020 Problem]()
- [Movie Recommender]()
- [Spam Detector]()
- [Transfer Learning Test]()
## Reinforcement Learning
- [Acrobat Q Learning]()
- [MaRLio]()
- [PPO Test]()
- [:star: Reinforcement Learning - Article Aid]()
- [Reinforcement Learning Test]()

### Autoencoders - Article Aid
A project created as a visual and code-based aid for an article I wrote on autoencoders. This project contains three unique autoencoders of varying levels of complexity, all trained on the MNIST dataset.
1. Single-layer Autoencoder
2. Multi-layer Autoencoder
3. Convolutional Autoencoder
Here is a [link](https://colab.research.google.com/drive/1DBOe9256acEyJ0rAjSohsm75oRHUmgJg?usp=sharing) to a live colab doc containing this project.

### Celeba Autoencoder
An autoencoder trained on the Celeba dataset with the purpose of being able to generate unique human faces.  While this autoencoder is able to effectively encode and decode real faces, and even make changes to those faces, I was unable to make it generate completely new faces.
Here is a [link](https://drive.google.com/drive/folders/1Ah_bEe5OuaQFJvAR0M5MajOO_qxWdtLd?usp=sharing) to a live colab doc containing this project.

### Micro MNIST Autoencoder
An autoencoder trained on the MNIST dataset with the purpose of having the smallest possible encoding dimensionality.  After a significant amount of tweaking I was able to bring the encoding dimensionality down to just three parameters, meaning that the latent space can be visually plotted in thee dimensions.
Here is a [link](https://colab.research.google.com/drive/1VPmO35w70_phQUSSUIqhvYiFp5TnHgzZ?usp=sharing) to a live colab doc containing this project.

### :star: Pong Generator
A large-scale project I created as an attempt to generate a fully-interactive game of Pong where the Input Management, Physics, and Rendering were all handled by AI.  This project was moderately successful if not extremely sensitive to changes. I was able to generate a video of a random agent playing within the AI-generated environment.  However, due to computational constraints I was unable to play in the AI environment myself.

The AI environment is made up of two distinct models - an engine and a renderer.  The engine is a feed-forward network that manages input management and physics interactions.  The renderer is the decoder portion of an autoencoder and manages converting the latent representation created by the engine and turning it into a sensical image.

Separate models were used for the renderer and engine portions because it allowed me to train them separately.  This meant that I could go over more iterations of different hyperparameters in less time.

### CNN CIFAR
A convolutional classifier I created when learning about colvolutional neural networks.  This model is able to classify images from the CIFAR-10 dataset.

### :star: CNN OCR
A collection of convolutional 

### RGB-Depth CNN

### MNIST GAN

### Pokemon GAN

### Linear LSTM

### MNIST RNN

### Simple RNN

### Stock Predictor

### Basic Linear Regression (First AI Project!)

### Flowkey Web Scraper

### Hashcode 2020 Problem

### Move Recommender

### Spam Detector

### Transfer Learning Test

### Acrobat Q Learning

### MaRLio

### PPO Test

### Reinforcement Learning - Article Aid

### Reinforcement Learning Test
