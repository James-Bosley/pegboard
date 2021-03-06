import { createSlice } from '@reduxjs/toolkit';

const numberOfCourts = 3;

const initialState = {
  waiting: [],
  onCourt: [],
  completed: []
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    addGame: (state, action) => {
      state.waiting.push(action.payload);
    },
    gameOn: (state) => {
      if(state.waiting.length > 0 && state.onCourt.length < numberOfCourts) {
        const game = state.waiting.shift();
        state.onCourt.push(game);
      }
    },
    gameOver: (state, action) => {
      state.completed.push(action.payload);
      state.onCourt = state.onCourt.filter(game => {
        return game.id !== action.payload.id;
      })
    }
  }
});

export const { addGame, gameOn, gameOver } = gamesSlice.actions;

export const selectGamesWaiting = (state) => state.games.waiting;
export const selectOnCourt = (state) => state.games.onCourt;

export default gamesSlice.reducer;
