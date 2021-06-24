# Python Projects
All python projects are either hosted in google colab (recent) or available for download (old / larger).

## Autoencoders
- [Autoencoders - Article Aid](#)
- [Micro MNIST Autoencoder](#)
- [Celeba Autoencoder](#)
- [:star: ML Pong Generator](#)

## Convolutional Networks
- [CNN CIFAR](#)
- [RGB-Depth CNN](#)
- [:star: CNN OCR](#)

## Generative Adversarial Networks
- [MNIST GAN](#)
- [Pokemon GAN](#)

## Long-Short Term Memory Networks
- [Linear -> LSTM](#)
- [MNIST RNN](#)
- [Stock Predictor](#)

## Reinforcement Learning
- [Acrobat Q Learning](#)
- [:star: Reinforcement Learning - Article Aid](#)

## Miscellaneous
- [Basic Linear Regression (First AI project!)](#)
- [:star: Flowkey Web Scraper](#)
- [Hashcode 2020 Problem](#)
- [Movie Recommender](#)
- [Spam Detector](#)
- [Transfer Learning Test](#)

### Autoencoders - Article Aid
<img align="right" width="25%" src="../_Docs\Images\Autoencoder-Article-Aid.PNG"></img>
A project created as a visual and code-based aid for an article I wrote on autoencoders. This project contains three unique autoencoders of varying levels of complexity, all trained on the MNIST dataset.
1. Single-layer Autoencoder
2. Multi-layer Autoencoder
3. Convolutional Autoencoder

Here is a [link](https://colab.research.google.com/drive/1DBOe9256acEyJ0rAjSohsm75oRHUmgJg?usp=sharing) to a live colab doc containing this project.

### Micro MNIST Autoencoder
An autoencoder trained on the MNIST dataset with the purpose of having the smallest possible encoding dimensionality.  After a significant amount of tweaking I was able to bring the encoding dimensionality down to just three parameters, meaning that the latent space can be visually plotted in thee dimensions.

Here is a [link](https://colab.research.google.com/drive/1VPmO35w70_phQUSSUIqhvYiFp5TnHgzZ?usp=sharing) to a live colab doc containing this project.

### Celeba Autoencoder
<img align="right" width="25%" src="../_Docs\Images\Celeba-Autoencoder.PNG"></img>
An autoencoder trained on the Celeba dataset with the purpose of being able to generate unique human faces.  While this autoencoder is able to effectively encode and decode real faces, and even make changes to those faces, I was unable to make it generate completely new faces.

Here is a [link](https://drive.google.com/drive/folders/1Ah_bEe5OuaQFJvAR0M5MajOO_qxWdtLd?usp=sharing) to a live colab doc containing this project.

### :star: ML Pong Generator
<img align="left" width="40%" src="../_Docs\Images\Pong-AI.gif"></img>
A large-scale project I created as an attempt to generate a fully-interactive game of Pong where the Input Management, Physics, and Rendering are all handled by AI.  This project was moderately successful if not extremely sensitive to changes. I was able to generate a video of a random agent playing within the AI-generated environment.  However, due to computational constraints I was unable to play in the AI environment myself.

The AI environment is made up of two distinct models - an engine and a renderer.  The engine is a feed-forward network that manages input management and physics interactions.  The renderer is the decoder portion of an autoencoder and manages converting the latent representation created by the engine and turning it into a sensible image.

Separate models were used for the renderer and engine portions because it allowed me to train them separately.  This meant that I could go over more iterations of different hyperparameters in less time.

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/1IERfi_D6OR623-C8V3DVgCRJYochLg_v?usp=sharing) to a google drive containing all the required files.

### CNN CIFAR
A convolutional classifier I created when learning about convolutional neural networks.  This model is able to classify images from the CIFAR-10 dataset.

Here is a [link](https://colab.research.google.com/drive/1Tj-hKWnQukDV4l3lhaRbjqc_6WcKx7Qa?usp=sharing) to a live colab doc containing this project.

### RGB-Depth CNN
A convolutional -> depth CNN I created while interested in creating a self-driving car. While the results are a bit blurry I feel that this is relatively impressive given all the model is given is a single image.  The data for this project was gathered from [this github page](https://dimlrgbd.github.io/).

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/12R89YWmtvbmrewk7xrhWSZT7h2jcjin0?usp=sharing) to a google drive containing all the required files.

### :star: CNN OCR
<img align="right" width="25%" src="../_Docs\Images\Handwriting-OCR.PNG"></img>
A large-scale project I made as an attempt OCR on handwritten images.  I started this project before learning that this is still a relatively open problem in Machine Learning, so my lackluster results seem justified.

The bulk of this model is a convolutional classifier trained on the EMNIST Dataset and a dataset of [mathematical symbols](https://www.kaggle.com/xainano/handwrittenmathsymbols) I found on google.  I identify characters in images through hard-coded CSV magic and then pass the formatted images into the classifier.  This is the project's main limitation, as it only works on the most perfect cherry-picked input images.

I also attempted to use the ResNet model as a classifier to raise the accuracy.  While it did slightly increase the quality of my results the overall effect was net negative as the training times ballooned.

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/12R89YWmtvbmrewk7xrhWSZT7h2jcjin0?usp=sharing) to a google drive containing all the required files.

### MNIST GAN
A small project I created when first learning about GANs.  The script uses the MNIST dataset to train a GAN and create novel images that fit the same style.

Here is a [link](https://colab.research.google.com/drive/1AAd2j3OaNh0xNnZBmFIIE6tCOIy2uk7q?usp=sharing) to a live colab doc containing this project.

### Pokemon GAN
A small project I made further exploring GANs where I attempted to generate novel pokemon.  While the end-results of this project were relatively disappointing I believe that this is mainly due to the small amount of training data and the frankly outlandish designs.

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
The first Reinforcement Learning project I created, functioning as an intro to how RL worked and how to setup the surrounding environments & models.  This project contains a basic agent that interacts with OpenAI Gym's Acrobat environment.

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/1WqVG7bSmJwPnClsoeqiNH38IJy1dVue2?usp=sharing) to a google drive containing all the required files.

### :star: Reinforcement Learning - Article Aid
<img align="right" width="25%" src="../_Docs\Images\RL-Article-Aid.gif"></img>
A Reinforcement Learning project I creates as aid for a 2-part article I wrote on RL.  This project contains well-documented notebooks for each of the steps to create a reinforcement learning agent.

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/1-0x_01zqpRU0uWF5yihRKtwTbuLTbPXd?usp=sharing) to a google drive containing all the required files.

### Basic Linear Regression (First AI Project!)
My first proper AI project.  Technically I made some NEAT-lite implementations first, but this is the first project where I knew what I was doing.  This is a simple linear model that attempts to predict the result of a sinusoidal graph.

Here is a [link](https://colab.research.google.com/drive/1QSThImwJnCPjCUT0sqjDlAU80vEjbuxG?usp=sharing) to a live colab doc containing this project.

### :star: Flowkey Web Scraper
<img align="left" width="40%" src="../_Docs\Images\Flowkey-Web-Scraper.PNG"></img>
A mid-scale python/JS project I created to scrape sheet music from Flowkey.  This project was very much made for myself alone, so it is very inflexible and executes commands via the windows terminal (This means don't trust it!).

This project takes a URL of a piece of sheet music from Flowkey and downloads the entire collection of images for said piece of music.  It then uses a branch of tesseract to convert the jpg image of sheet music into notation-based sheet music which is passed into musescore and converted into a formatted PDF.

This is also the first (and as of this date only) project I created that has some purpose other than satisfying my curiosity.  Bask in its utilitarian glory!

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/1mL_1QgGC9IYmizDiS7Hw_GBCJ91Q5xwF?usp=sharing) to a google drive containing all the required files.  I recommend not running this script unless you understand what you are doing.  If you need to run this script then feel free to reach out to me and I will help you set it up on your PC.

### Hashcode 2020 Problem
A collection of scripts I wrote while trying to solve the 2020 Hashcode problem.  The problem was, in simple terms, to optimize a set of static traffic lights so the maximum number of people could get to their destination in a given amount of time.

This is the first Hashcode competition I participated in.  Ergo, this solution is not particularity elegant or effective.  However, this project did help me to learn about code optimization (something which I constantly struggle with).

This project works best on a local machine. Here is a [link](https://drive.google.com/drive/folders/14Xglmk2lIJXhA-UO3yiZwEhcCwccifrD?usp=sharing) to a google drive containing all the required files.

### Movie Recommender
A basic AI movie recommender I created while following a machine learning course.  This project takes a collection of users and movies that they have rated and from this information predicts how a user will rate a movie.

Here is a [link](https://colab.research.google.com/drive/1JNChFTgZtwb4RJWjxDn-wK7Qy9RLVD68?usp=sharing) to a live colab doc containing this project.

### Spam Detector
A basic AI spam detector I created while following a machine learning course.  This project takes a short message as input and classifies it as either spam or 'ham' - not spam.  I mainly created this model as an attempt to learn about how to manage text with AI, a subject that I find very interesting, but these interests have as-of-now lead nowhere.

Here is a [link](https://colab.research.google.com/drive/1KTpCIEz8vQkz--kOD-Gsj2aUe_PZ7b-w?usp=sharing) to a live colab doc containing this project.

### Transfer Learning Test
A basic AI binary classifier created on top of the VGG16 model used to classify whether an image is of food or of not food.  This project was created for a machine learning course.  While I haven't build many more systems on top of pre-trained models this is something that I am currently interested in because it both vastly increases accuracy and decreases training time.

Here is a [link](https://colab.research.google.com/drive/1TmA1UVqtkdismhrBxC4SeupsJ1Py3rT2?usp=sharing) to a live colab doc containing this project.
