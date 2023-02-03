// import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameOver from "../GameOver/GameOver";
import "./Map.css";
// import Apple from "../../Apple/Apple";
// import Snake from "../Snake/Snake";

interface ISnakePart {
  Xpos: number;
  Ypos: number;
}

interface IApple {
  Xpos: number;
  Ypos: number;
}

type Direction = "down" | "up" | "right" | "left";

function Map() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);

  const [gameLoopTimeout, setGameLoopTimeout] = useState(50);
  const [timeoutId, setTimeoutId] = useState(0);

  const [directionChanged, setDirectionChanged] = useState(false);
  const [direction, setDirection] = useState<Direction>("right");
  const [isGameOver, setIsGameOver] = useState(false);

  const [snake, setSnake] = useState<ISnakePart[]>([]);
  const [startSnakeSize, setStartSnakeSize] = useState(0);
  const [apple, setApple] = useState<IApple>({ Xpos: 0, Ypos: 0 });

  const [snakeColor, setSnakeColor] = useState(getRandomColor());
  const [appleColor, setAppleColor] = useState(getRandomColor());

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("snakeHighScore")) || 0
  );
  const [newHighScore, setNewHighScore] = useState(false);

  function getRandomColor() {
    let hexa = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) color += hexa[Math.floor(Math.random() * 16)];
    return color;
  }

  useEffect(() => {
    initGame();
    window.addEventListener("keydown", handleKeyDown);
    // gameLoop();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function initGame() {
    let percentageWidth = 40;
    let width: number;
    const gameBoard = document.getElementById("GameBoard");

    if (gameBoard && gameBoard.parentElement) {
      width = gameBoard.parentElement.offsetWidth * (percentageWidth / 100);
    } else {
      {
        width = 700;
      }
    }

    width -= width % 30;
    if (width < 30) width = 30;
    let height = (width / 3) * 2;
    let blockWidth = width / 30;
    let blockHeight = height / 20;

    let startSnakeSize = 6;
    let snake = [];
    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);

    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }

    let appleXpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;

    let appleYpos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;

    while (appleYpos === snake[0].Ypos) {
      appleYpos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }

    // if (gameLoopTimeout > 25) setGameLoopTimeout(gameLoopTimeout - 0.5);

    setWidth(width);
    setHeight(height);
    setBlockWidth(blockWidth);
    setBlockHeight(blockHeight);
    setStartSnakeSize(startSnakeSize);
    setSnake(snake);
    setApple({ Xpos: appleXpos, Ypos: appleYpos });
  }

  useEffect(() => {
    if (snake.length !== 0) {
      let timer = setInterval(() => {
        if (!isGameOver) {
          console.log('!');
          moveSnake();
          tryToEatSnake();
          tryToEatApple();
          setDirectionChanged(false);
        }
  
        // gameLoop();
      }, 100);
  
      setTimeoutId(timer);
    }
  }, [snake]);

  // function gameLoop() {
  //   let timer = setTimeout(() => {
  //     if (!isGameOver) {
  //       // console.log('!');
  //       moveSnake();
  //       tryToEatSnake();
  //       tryToEatApple();
  //       setDirectionChanged(false);
  //     }

  //     gameLoop();
  //   }, gameLoopTimeout);

  //   setTimeoutId(timer);
  // }

  function moveSnake() {
      let snakeCopy = snake;

      let previousPartX = snake[0].Xpos;
      let previousPartY = snake[0].Ypos;

      let tmpPartX: number = previousPartX;
      let tmpPartY: number = previousPartY;

      moveHead();

      for (let i = 1; i < snakeCopy.length; i++) {
        tmpPartX = snakeCopy[i].Xpos;
        tmpPartY = snakeCopy[i].Ypos;
        snakeCopy[i].Xpos = previousPartX;
        snakeCopy[i].Ypos = previousPartY;
        previousPartX = tmpPartX;
        previousPartY = tmpPartY;
      }

      setSnake(snakeCopy);
  }

  function moveHead() {
    switch (direction) {
      case "left":
        moveHeadLeft();
        break;
      case "up":
        moveHeadUp();
        break;
      case "right":
        moveHeadRight();
        break;
      default:
        moveHeadDown();
    }
  }

  function moveHeadLeft() {
    let snakeCopy = snake;
    snakeCopy[0].Xpos =
      snakeCopy[0].Xpos <= 0
        ? width - blockWidth
        : snakeCopy[0].Xpos - blockWidth;
    setSnake(snakeCopy);
  }

  function moveHeadUp() {
    let snakeCopy = snake;
    snakeCopy[0].Ypos =
      snakeCopy[0].Ypos <= 0
        ? height - blockHeight
        : snakeCopy[0].Ypos - blockHeight;
    setSnake(snakeCopy);
  }

  function moveHeadRight() {
    let snakeCopy = snake;
    snakeCopy[0].Xpos =
      snakeCopy[0].Xpos >= width - blockWidth
        ? 0
        : snakeCopy[0].Xpos + blockWidth;
    setSnake(snakeCopy);
  }

  function moveHeadDown() {
    let snakeCopy = snake;
    snakeCopy[0].Ypos =
      snakeCopy[0].Ypos >= height - blockHeight
        ? 0
        : snakeCopy[0].Ypos + blockHeight;
    setSnake(snakeCopy);
  }

  function handleKeyDown(event: any) {
    if (isGameOver && event.keyCode === 32) {
      resetGame();
      return;
    }

    if (directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        goLeft();
        break;
      case 38:
      case 87:
        goUp();
        break;
      case 39:
      case 68:
        goRight();
        break;
      case 40:
      case 83:
        goDown();
        break;
      default:
    }
    setDirectionChanged(true);
  }

  function goLeft() {
    setDirection(direction === "right" ? "right" : "left");
  }

  function goUp() {
    setDirection(direction === "down" ? "down" : "up");
  }

  function goRight() {
    setDirection(direction === "left" ? "left" : "right");
  }

  function goDown() {
    setDirection(direction === "up" ? "up" : "down");
  }

  function tryToEatApple() {
      let snakeCopy = snake;
      let appleCopy = apple;

      if (
        snakeCopy[0].Xpos === appleCopy.Xpos &&
        snakeCopy[0].Ypos === appleCopy.Ypos
      ) {
        let newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos };

        snakeCopy.push(newTail);

        appleCopy.Xpos =
          Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
          blockWidth;

        appleCopy.Ypos =
          Math.floor(
            Math.random() * ((height - blockHeight) / blockHeight + 1)
          ) * blockHeight;

        while (isAppleOnSnake(appleCopy.Xpos, appleCopy.Ypos)) {
          appleCopy.Xpos =
            Math.floor(
              Math.random() * ((width - blockWidth) / blockWidth + 1)
            ) * blockWidth;
          appleCopy.Ypos =
            Math.floor(
              Math.random() * ((height - blockHeight) / blockHeight + 1)
            ) * blockHeight;
        }

        if (score === highScore) {
          setHighScore((highScore) => highScore + 1);
          localStorage.setItem("snakeHighScore", String(highScore));
          setNewHighScore(true);
        }

        // if (gameLoopTimeout > 25) setGameLoopTimeout(gameLoopTimeout - 0.5);

        setSnake(snakeCopy);
        setApple(appleCopy);
      }
  }

  function isAppleOnSnake(appleXpos: number, appleYpos: number) {
    for (let i = 0; i < snake.length; i++) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos)
        return true;
    }
    return false;
  }

  function tryToEatSnake() {
    for (let i = 1; i < snake.length; i++) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos)
        setIsGameOver(true);
    }
  }

  function resetGame() {
    let snake = [];
    let appleCopy = apple;

    let Xpos = width / 2;
    let Ypos = height / 2;
    let snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);

    for (let i = 1; i < startSnakeSize; i++) {
      Xpos -= blockWidth;
      let snakePart = { Xpos: Xpos, Ypos: Ypos };
      snake.push(snakePart);
    }

    appleCopy.Xpos =
      Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
      blockWidth;
    appleCopy.Ypos =
      Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
      blockHeight;

    while (isAppleOnSnake(appleCopy.Xpos, appleCopy.Ypos)) {
      appleCopy.Xpos =
        Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) *
        blockWidth;
      appleCopy.Ypos =
        Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) *
        blockHeight;
    }

    setSnake(snake);
    setApple(appleCopy);
    setDirection("right");
    setDirectionChanged(false);
    setIsGameOver(false);
    setGameLoopTimeout(50);
  }

  if (isGameOver) {
    return (
      <GameOver
        width={width}
        height={height}
        highScore={highScore}
        newHighScore={newHighScore}
        score={score}
      />
    )
  }


  return (
    <div
      id="GameBoard"
      style={{
        width: width,
        height: height,
        borderWidth: width / 50,
      }}
    >
      {snake.map((snakePart, index) => {
        return (
          <div
            key={index}
            className="Block"
            style={{
              width: blockWidth,
              height: blockHeight,
              left: snakePart.Xpos,
              top: snakePart.Ypos,
              background: snakeColor,
            }}
          />
        );
      })}
      <div
        className="Block"
        style={{
          width: blockWidth,
          height: blockHeight,
          left: apple.Xpos,
          top: apple.Ypos,
          background: appleColor,
        }}
      />
      <div id="Score" style={{ fontSize: width / 20 }}>
        HIGH-SCORE: {highScore}&ensp;&ensp;&ensp;&ensp;SCORE: {score}
      </div>
    </div>
  );
}

export default Map;
