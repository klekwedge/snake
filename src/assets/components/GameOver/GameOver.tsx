import { Box, Button, Flex, Heading } from "@chakra-ui/react";

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
  return (
    <Box
      id="GameBoard"
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
        id="GameOver"
        style={{ fontSize: width / 15 }}
      >
        <Heading
          id="GameOverText"
          fontSize="50px"
          color="#ca0000"
          textDecorationLine="underline"
        >
          GAME OVER
        </Heading>
        <div>Your score: {score}</div>
        <div>
          {newHighScore ? "New local " : "Local "}high score: {highScore}
        </div>
        <Button
          onClick={resetGame}
          color="#2e7ecb"
          fontWeight="bold"
          fontSize="30px"
          padding="40px"
          margin="0 auto"
          id="PressSpaceText"
        >
          Restart
        </Button>
      </Flex>
    </Box>
  );
}

export default GameOver;
