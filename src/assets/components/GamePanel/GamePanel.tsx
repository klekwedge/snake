import { Box, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { changeHighScore, changeNewHighScore, changeScore } from '../../../slices/snakeSlice/gameSlice';
import StartPanel from '../../StartPanel/StartPanel';
import GameOver from '../GameOver/GameOver';

interface ISnakePart {
  Xpos: number;
  Ypos: number;
}

interface IApple {
  Xpos: number;
  Ypos: number;
}

type Direction = 'down' | 'up' | 'right' | 'left';

function GamePanel() {
  const { snakeBodyColor, snakeHeadColor, appleColor, score, highScore, newHighScore, isGameStart } = useAppSelector(
    (state) => state.game,
  );
  const dispatch = useAppDispatch();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [blockWidth, setBlockWidth] = useState(0);
  const [blockHeight, setBlockHeight] = useState(0);

  const [gameLoopTimeout, setGameLoopTimeout] = useState(50);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const [directionChanged, setDirectionChanged] = useState(false);
  const [direction, setDirection] = useState<Direction>('right');
  const [isGameOver, setIsGameOver] = useState(false);

  const [snake, setSnake] = useState<ISnakePart[]>([]);
  const [startSnakeSize, setStartSnakeSize] = useState(6);
  const [apple, setApple] = useState<IApple>({ Xpos: 0, Ypos: 0 });

  function initGame() {
    const percentageWidth = 40;
    let width: number;
    const gameBoard = document.getElementById('GameBoard');

    if (gameBoard && gameBoard.parentElement) {
      width = gameBoard.parentElement.offsetWidth * (percentageWidth / 100);
    } else {
      {
        width = 700;
      }
    }

    width -= width % 30;

    if (width < 30) {
      width = 30;
    }

    const height = (width / 3) * 2;
    const blockWidth = width / 30;
    const blockHeight = height / 20;

    const snake = [];
    let Xpos = width / 2;
    const Ypos = height / 2;
    const snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);

    for (let i = 1; i < startSnakeSize; i += 1) {
      Xpos -= blockWidth;
      const snakePart = { Xpos, Ypos };
      snake.push(snakePart);
    }

    const appleXpos = Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) * blockWidth;

    let appleYpos = Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;

    while (appleYpos === snake[0].Ypos) {
      appleYpos = Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;
    }

    setWidth(width);
    setHeight(height);
    setBlockWidth(blockWidth);
    setBlockHeight(blockHeight);
    setSnake(snake);
    setApple({ Xpos: appleXpos, Ypos: appleYpos });
  }

  useEffect(() => {
    initGame();
  }, []);

  function moveHeadLeft() {
    const snakeCopy = snake;
    snakeCopy[0].Xpos = snakeCopy[0].Xpos <= 0 ? width - blockWidth : snake[0].Xpos - blockWidth;
    setSnake(snakeCopy);
  }

  function moveHeadUp() {
    const snakeCopy = snake;
    snakeCopy[0].Ypos = snakeCopy[0].Ypos <= 0 ? height - blockHeight : snakeCopy[0].Ypos - blockHeight;
    setSnake(snakeCopy);
  }

  function moveHeadRight() {
    const snakeCopy = snake;
    snakeCopy[0].Xpos = snakeCopy[0].Xpos >= width - blockWidth ? 0 : snakeCopy[0].Xpos + blockWidth;
    setSnake(snakeCopy);
  }

  function moveHeadDown() {
    const snakeCopy = snake;
    snakeCopy[0].Ypos = snakeCopy[0].Ypos >= height - blockHeight ? 0 : snakeCopy[0].Ypos + blockHeight;
    setSnake(snakeCopy);
  }

  function moveHead() {
    switch (direction) {
      case 'left':
        moveHeadLeft();
        break;
      case 'up':
        moveHeadUp();
        break;
      case 'right':
        moveHeadRight();
        break;
      default:
        moveHeadDown();
    }
  }

  function moveSnake() {
    const snakeCopy = snake;

    let previousPartX = snake[0].Xpos;
    let previousPartY = snake[0].Ypos;

    let tmpPartX: number = previousPartX;
    let tmpPartY: number = previousPartY;

    moveHead();

    for (let i = 1; i < snakeCopy.length; i += 1) {
      tmpPartX = snakeCopy[i].Xpos;
      tmpPartY = snakeCopy[i].Ypos;
      snakeCopy[i].Xpos = previousPartX;
      snakeCopy[i].Ypos = previousPartY;
      previousPartX = tmpPartX;
      previousPartY = tmpPartY;
    }

    setSnake(snakeCopy);
  }

  function goLeft() {
    setDirection(direction === 'right' ? 'right' : 'left');
  }

  function goUp() {
    setDirection(direction === 'down' ? 'down' : 'up');
  }

  function goRight() {
    setDirection(direction === 'left' ? 'left' : 'right');
  }

  function goDown() {
    setDirection(direction === 'up' ? 'up' : 'down');
  }

  function changeDirection(event: KeyboardEvent) {
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

  useEffect(() => {
    window.addEventListener('keydown', changeDirection);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('keydown', changeDirection);
    };
  }, [direction]);

  function isAppleOnSnake(appleXpos: number, appleYpos: number) {
    for (let i = 0; i < snake.length; i += 1) {
      if (appleXpos === snake[i].Xpos && appleYpos === snake[i].Ypos) return true;
    }
    return false;
  }

  function tryToEatSnake() {
    for (let i = 1; i < snake.length; i += 1) {
      if (snake[0].Xpos === snake[i].Xpos && snake[0].Ypos === snake[i].Ypos) setIsGameOver(true);
    }
  }

  function tryToEatApple() {
    const snakeCopy = snake;
    const appleCopy = apple;

    if (snakeCopy[0].Xpos === appleCopy.Xpos && snakeCopy[0].Ypos === appleCopy.Ypos) {
      const newTail = { Xpos: apple.Xpos, Ypos: apple.Ypos };

      snakeCopy.push(newTail);

      appleCopy.Xpos = Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) * blockWidth;

      appleCopy.Ypos = Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;

      while (isAppleOnSnake(appleCopy.Xpos, appleCopy.Ypos)) {
        appleCopy.Xpos = Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) * blockWidth;

        appleCopy.Ypos = Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;
      }

      if (score === highScore) {
        dispatch(changeHighScore(highScore + 1));
        localStorage.setItem('snakeHighScore', String(highScore));
        dispatch(changeNewHighScore(true));
      }

      dispatch(changeScore(score + 1));
      setSnake(snakeCopy);
      setApple(appleCopy);
    }
  }

  useEffect(() => {
    function gameLoop() {
      if (snake.length !== 0) {
        const timer = setTimeout(() => {
          if (!isGameOver) {
            moveSnake();
            tryToEatSnake();
            tryToEatApple();
            setDirectionChanged(false);
          }
        }, gameLoopTimeout);

        setTimeoutId(timer);
      }
    }

    const timerInterval = setInterval(() => gameLoop(), 100);

    return () => clearInterval(timerInterval);
  }, [snake, direction]);

  function resetGame() {
    const snake = [];
    const appleCopy = apple;

    let Xpos = width / 2;
    const Ypos = height / 2;
    const snakeHead = { Xpos: width / 2, Ypos: height / 2 };
    snake.push(snakeHead);

    for (let i = 1; i < startSnakeSize; i += 1) {
      Xpos -= blockWidth;
      const snakePart = { Xpos, Ypos };
      snake.push(snakePart);
    }

    appleCopy.Xpos = Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) * blockWidth;
    appleCopy.Ypos = Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;

    while (isAppleOnSnake(appleCopy.Xpos, appleCopy.Ypos)) {
      appleCopy.Xpos = Math.floor(Math.random() * ((width - blockWidth) / blockWidth + 1)) * blockWidth;
      appleCopy.Ypos = Math.floor(Math.random() * ((height - blockHeight) / blockHeight + 1)) * blockHeight;
    }

    setSnake(snake);
    setApple(appleCopy);
    setDirection('right');
    setDirectionChanged(false);
    setIsGameOver(false);
    dispatch(changeScore(0));
    dispatch(changeNewHighScore(false));
  }

  if (isGameOver) {
    return (
      <GameOver
        resetGame={() => resetGame()}
        width={width}
        height={height}
        highScore={highScore}
        newHighScore={newHighScore}
        score={score}
      />
    );
  }

  if (!isGameStart) {
    return <StartPanel />;
  }

  return (
    <Box position="relative" margin="auto" border="1px solid black" w={width} h={height} borderWidth={`${width / 50}`}>
      {snake.map((snakePart, index) => (
        <div
          key={index}
          style={{
            width: blockWidth,
            height: blockHeight,
            left: snakePart.Xpos,
            position: 'absolute',
            top: snakePart.Ypos,
            background: index !== 0 ? snakeBodyColor : snakeHeadColor,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          width: blockWidth,
          height: blockHeight,
          left: apple.Xpos,
          top: apple.Ypos,
          background: appleColor,
        }}
      />
      <div
        style={{
          fontSize: width / 20,
          position: 'relative',
          top: '105%',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        HIGH-SCORE: {highScore}&ensp;&ensp;&ensp;&ensp;SCORE: {score}
      </div>
    </Box>
  );
}

export default GamePanel;
