import pygame
from random import randint

class Ball(pygame.sprite.Sprite):

    def __init__(self, color, width, height):
        # call the parent class' init function
        pygame.sprite.Sprite.__init__(self)

        # pass in the color, position, and size of the paddle
        self.image = pygame.Surface([width, height])
        self.image.fill((0, 0, 0))
        self.image.set_colorkey((0, 0, 0))

        # draw the ball (a rectangle, not much of a ball)
        pygame.draw.rect(self.image, color, [0, 0, width, height])

        # fetch the rect that has the dimensions of the paddle
        self.rect = self.image.get_rect()
        self.width = width
        self.height = height

        # initialize the velocity randomly
        self.velocity = [randint(2, 4),randint(-3, 3)]

        # initialize the deltatime to 0
        self.deltaTime = 0;

    def update(self):
        self.rect.x += self.velocity[0] * self.deltaTime
        self.rect.y += self.velocity[1] * self.deltaTime

    def bounce(self):
        self.velocity[0] = -self.velocity[0]
        self.velocity[1] = randint(-3, 3)

        self.update()