import { createSlice } from '@reduxjs/toolkit';

// Initial state is hardcoded here. A final implementation should fetch player data from a database.

const initialState = {
  registeredPlayers: {
    1: { firstName: 'James', lastName: 'Bosley', gender: 'M', handedness: 'L', id: 1, wins: 0 },
    2: { firstName: 'Priyank', lastName: 'Patel', gender: 'M', handedness: 'L', id: 2, wins: 0 },
    3: { firstName: 'Ponsudahar', lastName: 'Kamaraj', gender: 'M', handedness: 'R', id: 3, wins: 0},
    4: { firstName: 'Paul', lastName: 'Smith', gender: 'M', handedness: 'R', id: 4, wins: 0},
    5: { firstName: 'Fasih', lastName: 'Khan', gender: 'M', handedness: 'R', id: 5, wins: 0},
    6: { firstName: 'Charles', lastName: 'Joseph', gender: 'M', handedness: 'R', id: 6, wins: 0},
    7: { firstName: 'Emma', lastName: 'Rudduck', gender: 'F', handedness: 'R', id: 7, wins: 0},
    8: { firstName: 'Emily', lastName: 'Stevenson', gender: 'F', handedness: 'R', id: 8, wins: 0},
    9: { firstName: 'Janet', lastName: 'Williams', gender: 'F', handedness: 'R', id: 9, wins: 0}
  },
  playerQueue: []
};

export const playersSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    registerPlayer: (state, action) => {
      state.registeredPlayers[action.payload.id] = action.payload;
    },
    unregisterPlayer: (state, action) => {
      delete state.registeredPlayers[action.payload];
    },
    enqueue: (state, action) => {
      action.payload.forEach(player => {
        if(state.registeredPlayers[player]) {
          if(!state.playerQueue.includes(player)) {
            state.playerQueue.push(player);
          } else {
            return alert('Player is already in the queue.');
          }
        } else {
          alert('Invalid Player ID');
        }
      });
    },
    dequeue: (state, action) => {
      action.payload.forEach(index => {
        if(state.playerQueue.includes(index)) {
          state.playerQueue = state.playerQueue.filter(player => {
            return player !== index;
          })
        } else {
          alert('Player not in queue.');
        }
      })
    },
    incrementWins: (state, action) => {
      action.payload.forEach(index => {
        state.registeredPlayers[index].wins++
      });
    }
  }
});

// Exporting reducer actions.
export const { registerPlayer, unregisterPlayer, enqueue, dequeue, incrementWins } = playersSlice.actions;

// Exporting selectors.
export const selectPlayers = (state) =>  state.players.registeredPlayers;
export const selectPlayerQueue = (state) => state.players.playerQueue;

// Exporting reducer.
export default playersSlice.reducer;
