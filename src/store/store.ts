import { configureStore } from '@reduxjs/toolkit';
import game from "../slices/snakeSlice/gameSlice";

const store = configureStore({
  reducer: {
    game
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;