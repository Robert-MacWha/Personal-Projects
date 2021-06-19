import numpy as np
import gym

class Environment:
    def __init__(self, environment):
        self.env   = gym.make(environment)

        self.state = np.asarray(self.env.reset())
        self.done  = False

        self.length = 0

    def step(self, action, render, max_length=None):
        
        if max_length and self.length > max_length:
            self.reset()
            return self.state, 0

        if self.done:
            return self.state, -1

        if render:
            self.env.render()
        
        new_state, reward, done, info = self.env.step(action)

        self.state = np.asarray(new_state)
        self.done = done

        self.length += 1

        return new_state, reward

    def reset(self):

        self.state  = np.asarray(self.env.reset())
        self.done   = False
        self.length = 0

    def close(self):
        self.env.close()