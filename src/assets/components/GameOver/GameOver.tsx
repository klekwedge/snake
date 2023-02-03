import { Button } from "@chakra-ui/react";
import React from "react";

interface GameOverProps {
  width: number;
  height: number;
  score: number;
  newHighScore: boolean;
  highScore: number;
  resetGame: () => void;
}

function GameOver({
  width,
  height,
  score,
  newHighScore,
  highScore,
  resetGame
}: GameOverProps) {
  return (
    <div
      id="GameBoard"
      style={{
        width: width,
        height: height,
        borderWidth: width / 50,
      }}
    >
      <div id="GameOver" style={{ fontSize: width / 15 }}>
        <div id="GameOverText">GAME OVER</div>
        <div>Your score: {score}</div>
        <div>
          {newHighScore ? "New local " : "Local "}high score: {highScore}
        </div>
        <Button onClick={resetGame} id="PressSpaceText">Restart</Button>
      </div>
    </div>
  );
}

export default GameOver;
