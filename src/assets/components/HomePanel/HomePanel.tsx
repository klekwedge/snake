import { Button, Flex, Heading } from "@chakra-ui/react";

interface HomePanelProps {
  changePanel: (
    isVisibleCustomPanel: boolean,
    isVisibleHomePanel: boolean
  ) => void;
}

function HomePanel({ changePanel }: HomePanelProps) {
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

export default HomePanel;
