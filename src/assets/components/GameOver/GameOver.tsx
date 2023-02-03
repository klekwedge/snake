import React from "react";

interface GameOverProps {
  width: number;
  height: number;
  score: number;
  newHighScore: boolean;
  highScore: number;
}

function GameOver({
  width,
  height,
  score,
  newHighScore,
  highScore,
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
        <div id="PressSpaceText">Press Space to restart</div>
      </div>
    </div>
  );
}

export default GameOver;
