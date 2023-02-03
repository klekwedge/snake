import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Apple from "../../Apple/Apple";
import Snake from "../Snake/Snake";

interface ISnakePart {
  Xpos: number;
  Ypos: number;
}

interface IApple {
  Xpos: number;
  Ypos: number;
}

function Map() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [directionChanged, setDirectionChanged] = useState(false);
  const [direction, setDirection] = useState("right");
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState<ISnakePart[]>([]);
  const [apple, setApple] = useState<IApple>({ Xpos: 0, Ypos: 0 });

  const [gameLoopTimeout, setGameLoopTimeout] = useState(50);
  const [timeoutId, setTimeoutId] = useState(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);
  const [startSnakeSize, setStartSnakeSize] = useState(0);

  useEffect(() => {
    initGame();
    window.addEventListener("keydown", handleKeyDown);
    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function initGame() {
    let percentageWidth = 40;
    let width;
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

    setWidth(width);
    setHeight(height);
    setBlockWidth(blockWidth);
    setBlockHeight(blockHeight);
    setStartSnakeSize(startSnakeSize);
    setSnake(snake);
    setApple({ Xpos: appleXpos, Ypos: appleYpos });
  }

  function gameLoop() {
    let timeoutId = setTimeout(() => {
      moveSnake();
      // tryToEatSnake();
      // tryToEatApple();
      setDirectionChanged(false);

      gameLoop();
    }, gameLoopTimeout);

    setTimeoutId(timeoutId);
  }

  function moveSnake() {
    let snakeCopy = snake;
    let previousPartX = snake[0].Xpos;
    let previousPartY = snake[0].Ypos;

    console.log(snake[0]);

    let tmpPartX = previousPartX;
    let tmpPartY = previousPartY;

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
    // switch (direction) {
    //   case 'left':
    //     moveHeadLeft()
    //     break
    //   case 'up':
    //     moveHeadUp()
    //     break
    //   case 'right':
    //     moveHeadRight()
    //     break
    //   default:
    //     moveHeadDown()
    // }
  }
  

  function handleKeyDown(event: any) {
    if (isGameOver && event.keyCode === 32) {
      //   resetGame();
    }

    if (directionChanged) return;

    switch (event.keyCode) {
      case 37:
      case 65:
        // goLeft();
        break;
      case 38:
      case 87:
        // goUp();
        break;
      case 39:
      case 68:
        // goRight();
        break;
      case 40:
      case 83:
        // goDown();
        break;
      default:
    }
    setDirectionChanged(true);
  }

  return (
    // <Flex border="5px solid black" w="500px" h="500px">
    /* <Snake />
      <Apple /> */
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
              background: "red",
              // background: snakeColor,
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
          background: "green",
          // background: appleColor,
        }}
      />
    </div>
    // </Flex>
  );
}

export default Map;
