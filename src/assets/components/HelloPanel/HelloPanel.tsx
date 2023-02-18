import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { chaneVisibleCustomPanel } from "../../../slices/snakeSlice/gameSlice";
import Customization from "../CustomizationPanel/CustomizationPanel";
// import Score from "../../Score/Score";
import Map from "../Map/Map";

interface HelloPanelProps {
  changePanel: (res: boolean) => void;
}

function HelloPanel({ changePanel }: HelloPanelProps) {
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
        Hello, would you like to customize some game parameters?
      </Heading>
      <Flex alignItems="center" justifyContent="center" gap="10px">
        <Button colorScheme="teal" onClick={() => changePanel(true)}>
          Yes
        </Button>
        <Button colorScheme="linkedin" onClick={() => changePanel(false)}>
          No
        </Button>
      </Flex>
    </Flex>
  );
}

export default HelloPanel;
