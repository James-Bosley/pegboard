import { createSlice } from '@reduxjs/toolkit';

// Initial state is hardcoded here. A final implementation should fetch player data from a database.

const initialState = {
  registeredPlayers: [
    { firstName: 'James', lastName: 'Bosley', gender: 'M', handedness: 'L', id: 1, wins: 0 },
    { firstName: 'Priyank', lastName: 'Patel', gender: 'M', handedness: 'L', id: 2, wins: 0 },
    { firstName: 'Ponsudahar', lastName: 'Kamaraj', gender: 'M', handedness: 'R', id: 3, wins: 0},
    { firstName: 'Paul', lastName: 'Smith', gender: 'M', handedness: 'R', id: 4, wins: 0},
    { firstName: 'Fasih', lastName: 'Khan', gender: 'M', handedness: 'R', id: 5, wins: 0},
    { firstName: 'Charles', lastName: 'Joseph', gender: 'M', handedness: 'R', id: 6, wins: 0},
    { firstName: 'Emma', lastName: 'Rudduck', gender: 'F', handedness: 'R', id: 7, wins: 0}
  ],
  playerQueue: []
};

export const playersSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    registerPlayer: (state, action) => {
      state.registeredPlayers.push(action.payload);
    },
    unregisterPlayer: (state, action) => {
      state.registeredPlayers = state.registeredPlayers.filter(player => {
        return player.id !== action.payload.id;
      });
    },
    enqueue: (state, action) => {
      const newPlayer = state.registeredPlayers.find(player => {
        return player.id === action.payload.id;
      });
      state.playerQueue.push(newPlayer);
    },
    dequeue: (state, action) => {
      action.payload.forEach(index => {
        state.playerQueue = state.playerQueue.filter(player => {
          return player.id !== index.id;
        })
      })
    },
    incrementWins: (state, action) => {
      const player = state.registeredPlayers.find(player => {
        return player.id === action.payload.id;
      });
      player.wins++;
      const playerList = state.playerQueue.find(player => {
        return player.id === action.payload.id;
      });
      playerList.wins++;
    }
  }
});

// Exporting reducer actions.
export const { registerPlayer, unregisterPlayer, enqueue, dequeue, incrementWins } = playersSlice.actions;

// Exporting selectors.
export const selectRegisteredPlayers = (state) => state.players.registeredPlayers;
export const selectPlayerQueue = (state) => state.players.playerQueue;

// Exporting reducer.
export default playersSlice.reducer;
