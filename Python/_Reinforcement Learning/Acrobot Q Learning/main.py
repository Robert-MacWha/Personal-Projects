import gym
import numpy as np
import matplotlib.pyplot as plt

    # Initialize base settings
EPISODES = 2000
SHOW_EVERY = 500
SAMPLE_EVERY = 500

# Amount that values change based on experience
LEARNING_RATE = 0.1
# Mesure of how important the future rewards are
DISCOUNT = 0.95

# Chance that agent will preform random actions (helps it to explore)
epsilon = 0.5
START_EPSILON_DECAYING = 1
# This means that the agent will stop taking random actions when it completes half of the episodes
END_EPSILON_DECAYING = EPISODES // 2
epsilon_decay_amount = epsilon/(END_EPSILON_DECAYING - START_EPSILON_DECAYING)

    # Initialize the environment
env = gym.make("Acrobot-v1")

print(f"Action space: {env.action_space.sample()}")
print(f"Observation space: {env.observation_space}")
print(f"Max observation values: {env.observation_space.high}")
print(f"Min observation values: {env.observation_space.low}")

    # Initialize the Agent
DISCRETE_ACTION_SPACE_SIZE = [20] * len(env.observation_space.high)
DISCRETE_ACTION_SIZE = (env.observation_space.high - env.observation_space.low) / DISCRETE_ACTION_SPACE_SIZE

q_table = np.random.uniform(low=-1, high=0, size=(([21] * len(env.observation_space.high)) + [env.action_space.n]))

    # Initialize reward history
block_rewards = []
reward_info = {"ep": [], "avg": [], "min": [], "max": []}

# Gets the discrete state of the agent from the continuous
def get_discrete_state(state):
    discrete_state = (state - env.observation_space.low) / DISCRETE_ACTION_SIZE
    return tuple(discrete_state.astype(np.int))


    # Train the agent
for episode in range(EPISODES):

    # Keeps track of what the rewards was in this episode (higher is better)
    episode_reward = 0

    discrete_state = get_discrete_state(env.reset())
    done = False

    if episode % SHOW_EVERY == 0:
        print(f"Episode {episode}")
        render = True
    else:
        render = False

    if episode % SAMPLE_EVERY == 0:
        sample = True
    else:
        sample = False 

    while not done:
        
        # Determin wether the action is random or not
        if np.random.random() > epsilon:
            # Take action from q table
            action = np.argmax(q_table[discrete_state])
        else:
            # Take exploratory (random) action
            action = np.random.randint(0, env.action_space.n)

        # Take a step in the environment
        new_state, reward, done, _ = env.step(action)
        episode_reward += reward

            # Now update the q table with the given equations
        # Get the new discrete state from the environment
        new_discrete_state = get_discrete_state(new_state)

        # If the environment has not finished
        if not done:
            # Calculate the maximum possible future reward from the current state
            max_future_q = np.max(q_table[new_discrete_state])
    
            # Get the current state
            current_q = q_table[discrete_state + (action, )]

            # Equation to calculate new q value
            new_q = (1 - LEARNING_RATE) * current_q + LEARNING_RATE * (reward + DISCOUNT * max_future_q)

            # Update the q table
            q_table[discrete_state + (action, )] = new_q

        discrete_state = new_discrete_state

        # Only render every n episodes
        if render:
            env.render()

    block_rewards.append(episode_reward)

    # Only compile reward info every m episodes
    if sample:
        # Save the Q table
        np.save(f"qtables/{episode}-qtable.npy", q_table)

        reward_info["ep"].append(episode)

        average_reward = sum(block_rewards) / len(block_rewards)
        min_reward = min(block_rewards)
        max_reward = max(block_rewards)

        reward_info["avg"].append(average_reward)
        reward_info["min"].append(min_reward)
        reward_info["max"].append(max_reward)

        block_rewards = []

plt.plot(reward_info["ep"], reward_info["avg"], label="average_reward")
plt.plot(reward_info["ep"], reward_info["min"], label="minimum_reward")
plt.plot(reward_info["ep"], reward_info["max"], label="maximum_reward")
plt.legend(loc=4)

plt.savefig("plot.png")
plt.show()

env.close()