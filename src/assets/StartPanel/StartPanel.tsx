import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { changeGameStart } from "../../slices/snakeSlice/gameSlice";

function StartPanel() {
  const { score, highScore } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function startNewGame() {
    dispatch(changeGameStart(true));
  }

  return (
    <Flex>
      <Box
        style={
          {
            // width: width,
            // height: height,
            // borderWidth: width / 50,
          }
        }
      >
        <Flex
          textAlign="center"
          h="100%"
          flexDirection="column"
          justifyContent="space-evenly"
          alignItems="center"
          gap="50px"
        >
          <Heading as="h2" fontSize="20px" fontWeight="500">
            High score: {highScore}
          </Heading>
          <Button
            onClick={startNewGame}
            color="teal.600"
            fontWeight="bold"
            fontSize="30px"
            padding="30px"
          >
            Start new game
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default StartPanel;
