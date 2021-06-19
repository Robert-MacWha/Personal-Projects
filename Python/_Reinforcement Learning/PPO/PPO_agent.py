import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Concatenate

import gym
import numpy as np
import copy

from environment import Environment

class PPO_Agent:
    def __init__(self, env, env_count, max_env_length=200, render=True, Y=0.95):
        self.env            = env

        sample_env          = gym.make(env)
        self.observation_space = len(sample_env.observation_space.sample())
        self.action_space      = len(sample_env.action_space.sample())

        self.env_count      = env_count
        self.max_env_length = max_env_length 
        self.render         = render
        self.Y              = Y

        # create the environments
        self.environments = []
        for i in range(env_count):
            self.environments.append(Environment(self.env))
        
        self.environments = np.asarray(self.environments)

        # create the AI models
        self.create_actor()
        self.create_critic()
        self.create_ppo()

    def create_actor(self):
        i = Input(self.observation_space)

        x = Dense(128, 'relu')(i)
        x = Dense(64 , 'relu')(x)
        x = Dense(32 , 'relu')(x)
        x = Dense(self.action_space, 'tanh')(x)

        self.actor = Model(i, x)
        
    def create_critic(self):
        i1 = Input(self.observation_space)
        x1 = Dense(128, 'relu')(i1)

        i2 = Input(self.action_space)
        x2 = Dense(128, 'relu')(i2)

        x = Concatenate()([x1, x2])
        x = Dense(128, 'relu')(x)
        x = Dense(64 , 'relu')(x)
        x = Dense(32 , 'relu')(x)
        x = Dense(1  , 'linear')(x)

        self.critic = Model([i1, i2], x)
        self.critic.compile(optimizer='adam', loss='mse')

    def ppo_loss(self, y_true, y_pred):
        return -tf.square(y_pred)

    def create_ppo(self):
        i = Input(self.observation_space)

        x = self.actor(i)

        self.critic.trainable = False
        x = self.critic([i, x])

        self.ppo = Model(i, x)
        self.ppo.compile(optimizer='adam', loss=self.ppo_loss)

    def get_future_rewards(self, new_states, rewards):
        # calculates value of a state given its reward and predicted future reward
        predicted_reward = self.ppo.predict(new_states)

        current_reward = rewards + self.Y * predicted_reward
        return current_reward

    def run_batch(self):
        # get all states from the list of environments
        states = []
        for env in self.environments:
            states.append(env.state)
        
        states = np.asarray(states)

        # feed the states into the actor and get the predicted actions
        actions = self.actor.predict(states)

        # take these actions
        new_states = []
        rewards    = [] 
        i          = 0
        render     = self.render

        for env in self.environments:
            new_state, reward = env.step(actions[i], render, self.max_env_length)
            new_states.append(new_state)
            rewards.append(reward)
            
            render = False
            i += 1

        new_states = np.asarray(new_states)
        rewards    = np.asarray(rewards) 

        # calculate the preducted future reward
        future_rewards = self.get_future_rewards(new_states, rewards)
        self.future_rewards = future_rewards

        # train the critic on the states, actions and predicted future rewards
        self.critic.trainable = True
        self.critic.fit([states, actions], future_rewards, epochs=1, verbose=0)
        self.critic.trainable = False

        # train the ppo agent on the current state and predicted future rewards
        self.ppo.fit(states, np.ones(shape=(states.shape[0])), epochs=1, verbose=0)

        # reset all done environments
        for env in self.environments:
            if env.done:
                env.reset()
    
    def close_envs(self):
        for env in self.environments:
            env.close()

    def run_trial(self):
        env = Environment(self.env)

        while not env.done:
            state = env.state
            state = np.asarray(state).reshape(1, -1)

            action = self.actor.predict(state)[0]

            env.step(action, True)
        
        env.close()