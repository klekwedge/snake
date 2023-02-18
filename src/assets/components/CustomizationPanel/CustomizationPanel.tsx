import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { selectSnakeBodyColor } from "../../../slices/snakeSlice/gameSlice";
import CustomPanel from "../CustomPanel/CustomPanel";

function CustomizationPanel() {
  const dispatch = useAppDispatch();
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

  function selectSnakeBody(color: string) {
    dispatch(selectSnakeBodyColor(color));
  }

  function selectSnakeHead(color: string) {
    dispatch(selectSnakeBodyColor(color));
  }

  function selectSnakeApple(color: string) {
    dispatch(selectSnakeBodyColor(color));
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="50px"
    >
      <CustomPanel
        colors={colors}
        title="Choose the color of the body of the snake"
        buttonHandler={selectSnakeBody}
      />
      <CustomPanel
        colors={colors}
        title="Choose the color of the head of the snake"
        buttonHandler={selectSnakeHead}
      />
      <CustomPanel
        colors={colors}
        title="Choose the color of the apple"
        buttonHandler={selectSnakeApple}
      />
      <Flex gap="300px">
        <Button colorScheme="linkedin">Past</Button>
        <Button colorScheme="teal">Next</Button>
      </Flex>
    </Flex>
  );
}

export default CustomizationPanel;
