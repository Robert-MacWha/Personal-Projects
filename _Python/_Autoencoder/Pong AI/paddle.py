import pygame

class Paddle(pygame.sprite.Sprite):
    def __init__(self, color, width, height):
        # call the parent class' init function
        pygame.sprite.Sprite.__init__(self)

        # pass in the color, position, and size of the paddle
        self.image = pygame.Surface([width, height])
        self.image.fill((0, 0, 0))
        self.image.set_colorkey((0, 0, 0))

        # draw the paddle
        pygame.draw.rect(self.image, color, [0, 0, width, height])

        # fetch the rect that has the dimensions of the paddle
        self.rect = self.image.get_rect()
        self.width = width
        self.height = height

        self.dir = 0

    def moveUp(self, pixels):
        self.rect.y -= pixels

        # collision detection
        if self.rect.y < 0:
            self.rect.y = 0

    def moveDown(self, pixels):
        self.rect.y += pixels

        # collision detection
        if self.rect.y > 192 - self.height:
            self.rect.y = 192 - self.height