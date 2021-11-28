import { createSlice } from '@reduxjs/toolkit';
import { loadPlayers, loadNextId } from '../../playerData';

// Reducer imports players from playerData.js. A final implementation should fetch player data from a database.

const initialState = {
  registeredPlayers: {},
  nextId: 0,
  playerQueue: []
};

export const playersSlice = createSlice({
  name: 'players',
  initialState: initialState,
  reducers: {
    load: (state) => {
      state.registeredPlayers = loadPlayers();
      state.nextId = loadNextId();
    },
    registerPlayer: (state, action) => {
      state.registeredPlayers[action.payload.id] = action.payload;
      state.nextId++
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

export const { load, registerPlayer, unregisterPlayer, enqueue, dequeue, incrementWins } = playersSlice.actions;

export const selectPlayers = (state) =>  state.players.registeredPlayers;
export const selectPlayerQueue = (state) => state.players.playerQueue;
export const selectNextId = (state) => state.players.nextId;

export default playersSlice.reducer;
