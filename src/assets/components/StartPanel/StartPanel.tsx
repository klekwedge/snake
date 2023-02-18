import { Button, Flex, Heading } from "@chakra-ui/react";

interface StartPanelProps {
  changePanel: (
    isVisibleCustomPanel: boolean,
    isVisibleHomePanel: boolean
  ) => void;
}

function StartPanel({ changePanel }: StartPanelProps) {
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
        <Button colorScheme="teal" onClick={() => changePanel(true, false)}>
          Yes
        </Button>
        <Button colorScheme="linkedin" onClick={() => changePanel(false, false)}>
          No
        </Button>
      </Flex>
    </Flex>
  );
}

export default StartPanel;
