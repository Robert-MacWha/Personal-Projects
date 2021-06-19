import numpy as np
from environment import Environment

env = Environment()

done = False
i = 0
while not done:
    done = env.update()
    if done:
        break
    done = env.render()

    if i > 20000:
        done = True

    if i % 1000 == 0:
        print(i)
    i += 1

env.quit()

# save the np arrays
screens = np.asarray(env.screens)
np.save('_screens-large.npy', screens)

actions = np.asarray(env.actions)
np.save('_actions-large.npy', actions)

print('completed')