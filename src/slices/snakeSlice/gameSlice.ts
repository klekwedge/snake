import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRandomColor } from "../../hooks/getRandomColor";
import { GameState } from "./gameSlice.types";

const initialState: GameState = {
  snakeBodyColor: "green",
  snakeHeadColor: "blue",
  appleColor: "red",
  isHelloPanelVisible: true,
  isCustomPanelVisible: null,
  score: 0,
  highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
  newHighScore: false,
  isGameStart: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    changePanel: (state, action) => {
      state.isHelloPanelVisible = action.payload.isVisibleHelloPanel;
      state.isCustomPanelVisible = action.payload.isCustomPanelVisible;
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
      state.score = action.payload;
    },
    changeHighScore: (state, action) => {
      state.highScore = action.payload;
    },
    changeNewHighScore: (state, action) => {
      state.newHighScore = action.payload;
    },
    changeGameStart: (state, action) => {
      state.isGameStart = action.payload;
    },
  },
});

const { actions, reducer } = gameSlice;
export const {
  changePanel,
  selectSnakeBodyColor,
  selectSnakeHeadColor,
  selectAppleColor,
  changeScore,
  changeHighScore,
  changeNewHighScore,
  changeGameStart,
} = actions;
export default reducer;
