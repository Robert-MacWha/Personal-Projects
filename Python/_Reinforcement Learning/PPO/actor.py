from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense

from tensorflow.keras import backend as K

# the actor model looks at a state and predicts what action to take
class Actor:
    def __init__(self, observation_space, action_space):

        i = Input(observation_space)
        x = Dense(256, 'relu')(i)
        x = Dense(128, 'relu')(x)
        x = Dense(32 , 'relu')(x)
        x = Dense(action_space, activation=None)(x)

        self.model = Model(i, x)
        self.model.compile('adam', 'mse')