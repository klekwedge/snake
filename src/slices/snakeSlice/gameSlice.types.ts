export interface GameState {
  snakeBodyColor: string;
  snakeHeadColor: string;
  appleColor: string;
  isHelloPanelVisible: boolean;
  isCustomPanelVisible: boolean | null;
  score: number;
  highScore: number;
  newHighScore: boolean;
  isGameStart: boolean;
}
