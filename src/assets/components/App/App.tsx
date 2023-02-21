import { Flex } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import CustomizationPanel from "../CustomizationPanel/CustomizationPanel";
import HomePanel from "../HomePanel/HomePanel";
import GamePanel from "../GamePanel/GamePanel";

function App() {
  const dispatch = useAppDispatch();
  const { isHelloPanelVisible, isCustomPanelVisible } = useAppSelector(
    (state) => state.game
  );

  if (isHelloPanelVisible) {
    return <HomePanel/>;
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="20px"
    >
      {isCustomPanelVisible ? <CustomizationPanel /> : <GamePanel />}
    </Flex>
  );
}

export default App;
