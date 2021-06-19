import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Concatenate
from tensorflow.keras.optimizers import Adam

import gym
import numpy as np
import matplotlib.pyplot as plt

ENVIRONMENT   = 'CartPole-v0'  # list of all envs can be found here: https://github.com/openai/gym/wiki/Table-of-environments
EPOCHS        = 500
EPOCH_LENGTH  = 200
BATCH_SIZE    = 128
Y             = 0.9               # how much the critic cares about future rewards
EPSILON       = 0.5               # likelyhood of actor taking a random action
EPSILON_DECAY = 0.99995
PRINT_EVERY   = 2

info_env = gym.make(ENVIRONMENT)
observation_space = len(info_env.observation_space.low)
action_space = info_env.action_space.n

class Environment:
    def __init__(self):
        self.env = gym.make(ENVIRONMENT)

        self.state = np.asarray(self.env.reset())
        self.reward_sum = 0
        self.done = False

    def step(self, action, render):

        if self.done:
            return self.state, -1

        if render:
            self.env.render()

        new_state, reward, done, info = self.env.step(action)

        self.state = np.asarray(new_state)
        self.reward_sum += reward
        self.done = done

        return new_state, reward

    def reset(self):

        reward_sum = self.reward_sum

        self.state = np.asarray(self.env.reset())
        self.reward_sum = 0
        self.done = False

        return reward_sum

# create the actor model
i = Input(shape=(observation_space, ))
x = Dense(10, activation='relu')(i)
x = Dense(10, activation='relu')(x)
x = Dense(action_space, activation='linear')(x)

actor = Model(i, x)

actor.compile(loss='mse', optimizer=Adam(lr=0.00005))

# create the environments used to train the models
environments = []
for i in range(BATCH_SIZE):
    environments.append(Environment())

# train the models
reward_history = []

for e in range(1, EPOCHS + 1):

    epoch_rewards = np.zeros(BATCH_SIZE)
    done = False

    for i in range(EPOCH_LENGTH):
        # get the states in each environment
        states = []
        for env in environments:
            states.append(env.state)
        
        states = np.asarray(states)

        # get the actor's predicted action for each given state
        actions = actor.predict(states)
        argmaxed_actions = np.argmax(actions, axis=1)

        for i in range(len(actions)):
            if np.random.random() < EPSILON:
                argmaxed_actions[i] = np.random.randint(action_space)

        # preform the predicted actions and save the new_states + rewards
        new_states = []
        rewards = []
        i = 0

        render = True
        for env in environments:
            new_state, reward = env.step(argmaxed_actions[i], render)
            rewards.append(reward)
            new_states.append(new_state)
            i += 1

            render = False

        new_states    = np.asarray(new_states)
        rewards = np.asarray(rewards).reshape(BATCH_SIZE, 1)
        epoch_rewards = np.add(rewards.reshape(BATCH_SIZE), epoch_rewards.reshape(BATCH_SIZE))

        # calculate the xs & ys for training the critic
        action_to_embedded_array = np.diag(np.ones(action_space))
        
        Xs = np.asarray(states)
        q_values = np.add(rewards, np.multiply(actor.predict(new_states), Y))

        Ys = np.array(actions, copy=True)

        for i in range(len(q_values)):
            Ys[i][argmaxed_actions[i]] = q_values[i][argmaxed_actions[i]]

        # train the actor
        actor.fit(
            x = Xs,
            y = Ys,
            epochs=1,
            verbose=0
        )

        EPSILON *= EPSILON_DECAY

    # print out info on the model
    if e % PRINT_EVERY == 0:

        rewards = np.asarray(epoch_rewards)

        epoch      = str(e).ljust(len(str(EPOCHS)))[:len(str(EPOCHS))]
        min_reward = str(np.amin   (rewards)).ljust(5)[:5]
        max_reward = str(np.amax   (rewards)).ljust(5)[:5]
        avg_reward = str(np.average(rewards)).ljust(5)[:5]
        epsilon    = str(EPSILON).ljust(4)[:4]

        print(f'Epoch: {epoch} | Min Reward: {min_reward} | Max Reward: {max_reward} | Average Reward: {avg_reward} | Epsilon: {epsilon}')

        reward_history.append([min_reward, max_reward, avg_reward])

        if (np.average(rewards) >= 150 and np.amin(rewards) > 50):
            done = True

    if done:
        break

    for env in environments:
        env.reset()


print('-'*10, 'Finished Training', '-'*10)

# save the model
actor.save('actor.h5')

# save the reward history
reward_history = np.asarray(reward_history)
np.save(reward_history, 'rewards_history.npy')

# save reward history
plt.plot(reward_history[:][0], label='min loss')
plt.plot(reward_history[:][1], label='max loss')
plt.plot(reward_history[:][2], label='avg loss')
plt.legend(loc=1)
plt.savefig(f'reward_history.png')