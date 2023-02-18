import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { chaneVisibleCustomPanel } from "../../../slices/snakeSlice/gameSlice";
import CustomizationPanel from "../CustomizationPanel/CustomizationPanel";
import HelloPanel from "../HelloPanel/HelloPanel";
// import Score from "../../Score/Score";
import Map from "../Map/Map";

function App() {
  const dispatch = useAppDispatch();
  const [isHelloPanelVisible, setIsHelloPanelVisible] = useState(true);
  const { isCustomPanelVisible } = useAppSelector((state) => state.game);

  function changePanel(res: boolean) {
    dispatch(chaneVisibleCustomPanel(res));
    setIsHelloPanelVisible(false);
  }

  if (isHelloPanelVisible) {
    return <HelloPanel changePanel={changePanel} />;
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
      {isCustomPanelVisible ? <CustomizationPanel /> : <Map />}
    </Flex>
  );
}

export default App;
