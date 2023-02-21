import { Box, Button, Flex, Heading } from "@chakra-ui/react";

function StartPanel() {
  return (
    <Flex>
      <Box
        id="GameBoard"
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
          id="GameOver"
          // style={{ fontSize: width / 15 }}
        >
          {/* <div>Your score: {score}</div> */}
          <div>
            {/* {newHighScore ? "New local " : "Local "}high score: {highScore} */}
          </div>
          <Heading id="GameOverText" fontSize="50px" color="teal.600">
            Start
          </Heading>
          <Button
            // onClick={resetGame}
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
    </Flex>
  );
}

export default StartPanel;
