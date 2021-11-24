import { createSlice } from '@reduxjs/toolkit';

const numberOfCourts = 3;

const initialState = {
  waiting: [],
  onCourt: []
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    addGame: (state, action) => {
      state.waiting.push(action.payload);
    },
    gameOn: (state) => {
      if(state.onCourt.length < numberOfCourts) {
        const game = state.waiting.shift();
        state.onCourt.push(game);
      }
    },
    gameOver: (state, action) => {
      state.onCourt = state.onCourt.filter(game => {
        return game.id !== action.payload.id;
      })
    }
  }
});

// Exporting reducer actions.
export const { addGame, gameOn, gameOver } = gamesSlice.actions;

// Exporting selectors.
export const selectGamesWaiting = (state) => state.games.waiting;
export const selectOnCourt = (state) => state.games.onCourt;

// Exporting reducer.
export default gamesSlice.reducer;
