import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/players/playersSlice';
import gamesReducer from '../features/games/gamesSlice';

export const store = configureStore({
  reducer: {
    players: playerReducer,
    games: gamesReducer
  },
});
