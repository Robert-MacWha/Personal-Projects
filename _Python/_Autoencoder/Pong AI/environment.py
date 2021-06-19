import pygame
import numpy as np

from paddle import Paddle
from ball import Ball
from random import randint

BLACK = (0,0,0)
WHITE = (255,255,255)
GREY  = (100, 100, 100)

size = (256, 192)

class Environment:

    screens = []
    actions = []
    action = (0)

    def __init__(self):
        pygame.init()

        # Open a new window
        self.screen = pygame.display.set_mode(size)
        pygame.display.set_caption("Pong")

        self.clock = pygame.time.Clock()

        # create the two paddles
        self.paddle_a = Paddle(WHITE, 4, 32)
        self.paddle_a.rect.x = 20
        self.paddle_a.rect.y = (size[1] / 2) - 50

        self.paddle_b = Paddle(WHITE, 4, 32)
        self.paddle_b.rect.x = size[0] - 30
        self.paddle_b.rect.y = (size[1] / 2) - 50

        # create the ball
        self.ball = Ball(WHITE, 8, 8)
        self.ball.rect.x = size[0] / 2
        self.ball.rect.y = size[1] / 2

        # gather all sprites
        self.all_sprites_list = pygame.sprite.Group()

        self.all_sprites_list.add(self.paddle_a)
        self.all_sprites_list.add(self.paddle_b)
        self.all_sprites_list.add(self.ball)

    def update(self):
        # ----- main event loop -----
        done = False
        for event in pygame.event.get():
            if event.type == pygame.QUIT: # exit the program
                done = True
        
        # ----- detect keyboard inputs
        """
        keys = pygame.key.get_pressed()
        if keys[pygame.K_UP]:
            self.paddle_a.moveUp(5)
        if keys[pygame.K_DOWN]:
            self.paddle_a.moveDown(5)
        """

        deltaTime = 2

        # ----- random AI for primary paddle
        self.action = 0
        self.paddle_a.dir += randint(-2, 2)
        self.paddle_a.dir /= 1.05
        if (self.paddle_a.dir > 2):
            self.paddle_a.moveUp(5 * deltaTime)
            self.action = 1
        elif (self.paddle_a.dir < -2):
            self.paddle_a.moveDown(5 * deltaTime)
            self.action = -1

        # ----- ai for secondary paddle
        if self.ball.rect.x < self.paddle_b.rect.x:
            paddle_pos = self.paddle_b.rect[1] + (self.paddle_b.height/2)
            pos_dif = self.ball.rect.y - paddle_pos
            if pos_dif > 5:
                self.paddle_b.moveDown(min(3, abs(pos_dif)) * deltaTime)
            elif pos_dif < -5:
                self.paddle_b.moveUp(min(3, abs(pos_dif)) * deltaTime)

        self.ball.deltaTime = deltaTime
        self.all_sprites_list.update()

        # ball collision detection
        if self.ball.rect.x >= size[0] - self.ball.width:
            self.ball.velocity[0] = -self.ball.velocity[0]
            self.ball.rect.x = size[0] - self.ball.width
        if self.ball.rect.x <= 0:
            self.ball.velocity[0] = -self.ball.velocity[0]
            self.ball.rect.x = 0
        if self.ball.rect.y >= size[1] - self.ball.height:
            self.ball.velocity[1] = -self.ball.velocity[1]  
            self.ball.rect.y = size[1] - self.ball.height
        if self.ball.rect.y <= 0:
            self.ball.velocity[1] = -self.ball.velocity[1]
            self.ball.rect.y = 0  

        if pygame.sprite.collide_mask(self.ball, self.paddle_a) or pygame.sprite.collide_mask(self.ball, self.paddle_b):
            self.ball.bounce()

        return done

    def render(self):
        # ----- rendering engine -----
        self.screen.fill(BLACK) # clear the screen

        # render the center line
        # pygame.draw.line(self.screen, GREY, [300, 0], [300, 500], 5)

        # render the paddles
        self.all_sprites_list.draw(self.screen) 

        # update the screen
        pygame.display.flip()

        # save the rendered screen
        self.screens.append(np.clip(pygame.surfarray.array2d(self.screen), 0, 1))
        self.actions.append(self.action)


        # ----- limit to 60fps
        # self.clock.tick(60)

    def quit(self):
        pygame.quit()