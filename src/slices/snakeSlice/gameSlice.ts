import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomColor } from "../../hooks/getRandomColor";
import { GameState } from "./gameSlice.types";

const initialState: GameState = {
  snakeBodyColor: "green",
  appleColor: getRandomColor(),
  IsSnakeBodySelectionOpen: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectSnakeBodyColor: (state, action) => {
      state.snakeBodyColor = action.payload;
      state.IsSnakeBodySelectionOpen = false;
    },
  },
});

const { actions, reducer } = gameSlice;
export const { selectSnakeBodyColor } = actions;
export default reducer;
