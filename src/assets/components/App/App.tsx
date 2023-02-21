import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { changeVisibleCustomPanel } from "../../../slices/snakeSlice/gameSlice";
import CustomizationPanel from "../CustomizationPanel/CustomizationPanel";
import HomePanel from "../HomePanel/HomePanel";
import GamePanel from "../GamePanel/GamePanel";

function App() {
  const dispatch = useAppDispatch();
  const [isHelloPanelVisible, setIsHelloPanelVisible] = useState(true);
  const { isCustomPanelVisible } = useAppSelector((state) => state.game);

  function changePanel(
    isVisibleCustomPanel: boolean,
    isVisibleHomePanel: boolean
  ) {
    console.log('!');
    dispatch(changeVisibleCustomPanel(isVisibleCustomPanel));
    setIsHelloPanelVisible(isVisibleHomePanel);
  }

  if (isHelloPanelVisible) {
    return <HomePanel changePanel={changePanel} />;
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
      {isCustomPanelVisible ? (
        <CustomizationPanel changePanel={changePanel} />
      ) : (
        <GamePanel />
      )}
    </Flex>
  );
}

export default App;
