export interface GameState {
  snakeBodyColor: string;
  snakeHeadColor: string;
  snakeAppleColor: string;
  appleColor: string;
  isCustomPanelVisible: boolean | null;
  score: number;
  highScore: number;
  newHighScore: boolean;
  isGameStart: boolean;
}
