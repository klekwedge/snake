import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomColor } from "../../hooks/getRandomColor";
import { GameState } from "./gameSlice.types";

const initialState: GameState = {
  snakeBodyColor: "green",
  snakeHeadColor: "blue",
  snakeAppleColor: "red",
  appleColor: getRandomColor(),
  isCustomPanelVisible: null,
  score: 0,
  highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
  newHighScore: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changeVisibleCustomPanel: (state, action) => {
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
    changeScore: (state, action) => {
      state.score = action.payload
    },
    changeHighScore: (state, action) => {
      state.highScore = action.payload
    },
    changeNewHighScore: (state, action) => {
      state.newHighScore = action.payload
    },
  },
});

const { actions, reducer } = gameSlice;
export const {
  changeVisibleCustomPanel,
  selectSnakeBodyColor,
  selectSnakeHeadColor,
  selectAppleColor,
  changeScore,
  changeHighScore,
  changeNewHighScore
} = actions;
export default reducer;
