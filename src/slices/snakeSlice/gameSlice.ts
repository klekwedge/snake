import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomColor } from "../../hooks/getRandomColor";
import { GameState } from "./gameSlice.types";

const initialState: GameState = {
  snakeBodyColor: "green",
  snakeHeadColor: "blue",
  snakeAppleColor: "red",
  appleColor: getRandomColor(),
  isCustomPanelVisible: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    chaneVisibleCustomPanel: (state, action) => {
      state.isCustomPanelVisible = action.payload;
    },
    selectSnakeBodyColor: (state, action) => {
      state.snakeBodyColor = action.payload;
    },
    selectSnakeHeadColor: (state, action) => {
      state.snakeHeadColor = action.payload;
    },
    selectAppleColor: (state, action) => {
      state.appleColor = action.payload;
    },
  },
});

const { actions, reducer } = gameSlice;
export const {
  chaneVisibleCustomPanel,
  selectSnakeBodyColor,
  selectSnakeHeadColor,
  selectAppleColor,
} = actions;
export default reducer;
