import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { changePanel } from "../../../slices/snakeSlice/gameSlice";

function HomePanel() {
  const dispatch = useAppDispatch();

  return (
    <Flex
      flexDirection="column"
      gap="20px"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" fontWeight="500">
        Would you like to customize some game parameters?
      </Heading>
      <Flex alignItems="center" justifyContent="center" gap="10px">
        <Button
          colorScheme="teal"
          onClick={() =>
            dispatch(
              changePanel({
                isHelloPanelVisible: false,
                isCustomPanelVisible: true,
              })
            )
          }
        >
          Yes
        </Button>
        <Button
          colorScheme="linkedin"
          onClick={() =>
            dispatch(
              changePanel({
                isHelloPanelVisible: false,
                isCustomPanelVisible: false,
              })
            )
          }
        >
          No
        </Button>
      </Flex>
    </Flex>
  );
}

export default HomePanel;
