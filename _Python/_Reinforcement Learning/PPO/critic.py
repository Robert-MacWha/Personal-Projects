from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, Concatenate

from tensorflow.keras import backend as K

# the actor model looks at a state and predicts what action to take
class Critic:
    def __init__(self, observation_space, action_space):
        i1 = Input(shape=(observation_space))
        i2 = Input(shape=(action_space))

        x = Concatenate()([i1, i2])
        x = Dense(256, 'relu')(x)
        x = Dense(64 , 'relu')(x)
        x = Dense(32 , 'relu')(x)
        x = Dense(1, activation=None)(x)

        self.model = Model([i1, i2], x)
        self.model.compile('adam', 'mse')