import { Button, Flex } from "@chakra-ui/react";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import {
  changePanel,
  selectAppleColor,
  selectSnakeBodyColor,
  selectSnakeHeadColor,
} from "../../../slices/snakeSlice/gameSlice";
import CustomPanel from "../CustomPanel/CustomPanel";

function CustomizationPanel() {
  const dispatch = useAppDispatch();
  const colors = ["red", "blue", "green", "yellow", "orange", "purple"];

  function selectSnakeBody(color: string) {
    dispatch(selectSnakeBodyColor(color));
  }

  function selectSnakeHead(color: string) {
    dispatch(selectSnakeHeadColor(color));
  }

  function selectSnakeApple(color: string) {
    dispatch(selectAppleColor(color));
  }

  function backButtonHandler() {
    dispatch(selectSnakeBodyColor("green"));
    dispatch(selectSnakeHeadColor("blue"));
    dispatch(selectAppleColor("red"));
    dispatch(
      changePanel({
        isHelloPanelVisible: true,
        isCustomPanelVisible: false,
      })
    );
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="50px"
      background="blue.500"
      p="50px 50px 30px 50px"
      borderRadius="20px"
      color="white"
    >
      <CustomPanel
        colors={colors}
        title="Choose the color of the body of the snake"
        defaultColor="green"
        buttonHandler={selectSnakeBody}
      />
      <CustomPanel
        colors={colors}
        title="Choose the color of the head of the snake"
        defaultColor="blue"
        buttonHandler={selectSnakeHead}
      />
      <CustomPanel
        colors={colors}
        title="Choose the color of the apple"
        defaultColor="red"
        buttonHandler={selectSnakeApple}
      />
      <Flex gap="400px">
        <Button
          background="gray.500"
          _hover={{
            background: "gray.400",
          }}
          onClick={backButtonHandler}
        >
          Past
        </Button>
        <Button
          background="gray.500"
          _hover={{
            background: "gray.400",
          }}
          onClick={() =>
            dispatch(
              changePanel({
                isHelloPanelVisible: false,
                isCustomPanelVisible: false,
              })
            )
          }
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}

export default CustomizationPanel;
