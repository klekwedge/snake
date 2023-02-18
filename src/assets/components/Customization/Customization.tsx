import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { selectSnakeBodyColor } from "../../../slices/snakeSlice/gameSlice";

function Customization() {
  const [currentColor, setCurrentColor] = useState("green");
  const dispatch = useAppDispatch();
  const { IsSnakeBodySelectionOpen } = useAppSelector((state) => state.game);
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

  function buttonHandler() {
    dispatch(selectSnakeBodyColor(currentColor));
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="20px"
    >
      {IsSnakeBodySelectionOpen ? (
        <>
          {" "}
          <Heading as="h2" fontWeight="500">
            Choose the color of the body of the snake
          </Heading>
          <Flex gap="15px" alignItems="center" justifyContent="center">
            <Flex gap="3px" fontSize="20px">
              {colors.map((item) => (
                <Box
                  background={item}
                  key={uuidv4()}
                  width="20px"
                  h="20px"
                  cursor="pointer"
                  onClick={() => setCurrentColor(item)}
                  border={`${currentColor === item ? "3px solid black" : ""}`}
                />
              ))}
            </Flex>
            <Button onClick={buttonHandler}>Done</Button>{" "}
          </Flex>
        </>
      ) : (
        ""
      )}
    </Flex>
  );
}

export default Customization;
