import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "./gameSlice.types";

const initialState: GameState = {};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
});

const { actions, reducer } = gameSlice;
export const {} = actions;
export default reducer;
