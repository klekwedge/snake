import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  changeGameStart,
  changePanel,
} from "../../../slices/snakeSlice/gameSlice";

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
  resetGame,
}: GameOverProps) {
  const dispatch = useAppDispatch();

  function goToCustomizationPanel() {
    dispatch(
      changePanel({
        isHelloPanelVisible: false,
        isCustomPanelVisible: true,
      })
    );

    dispatch(changeGameStart(false));
  }

  return (
    <Box
      style={{
        width: width,
        height: height,
        borderWidth: width / 50,
      }}
    >
      <Flex
        textAlign="center"
        h="100%"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="center"
        style={{ fontSize: width / 15 }}
      >
        <Heading fontSize="50px" color="#ca0000" textDecorationLine="underline">
          GAME OVER
        </Heading>
        <div>Your score: {score}</div>
        <div>
          {newHighScore ? "New local " : "Local "}high score: {highScore}
        </div>
        <Flex flexWrap="wrap" gap="30px">
          <Button
            onClick={resetGame}
            color="#2e7ecb"
            fontWeight="bold"
            fontSize="30px"
            padding="30px"
          >
            Restart
          </Button>
          <Button
            onClick={goToCustomizationPanel}
            color="#2e7ecb"
            fontWeight="bold"
            fontSize="30px"
            padding="30px"
          >
            Customization
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default GameOver;
