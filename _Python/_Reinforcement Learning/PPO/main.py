import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 

import numpy as np
from tqdm import trange

from PPO_agent import PPO_Agent

ppo = PPO_Agent('LunarLanderContinuous-v2', 128, max_env_length=300)

t = trange(10000, desc='Info', leave=True)
for i in t:
    ppo.run_batch()

    reward_str  = str(ppo.future_rewards[0][0]).ljust(5)[:5]

    t.set_description(f'Predicted Reward: {reward_str}')

ppo.close_envs()

while True:
    ppo.run_trial()