import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { changeVisibleCustomPanel } from "../../../slices/snakeSlice/gameSlice";
import CustomizationPanel from "../CustomizationPanel/CustomizationPanel";
import StartPanel from "../StartPanel/StartPanel";
// import Score from "../../Score/Score";
import Map from "../Map/Map";

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
    return <StartPanel changePanel={changePanel} />;
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
        <Map />
      )}
    </Flex>
  );
}

export default App;
