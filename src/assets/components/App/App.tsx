import { Box, Flex } from "@chakra-ui/react";
import Customization from "../Customization/Customization";
// import Score from "../../Score/Score";
import Map from "../Map/Map";

function App() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="20px"
    >
      <Customization />
      <Map />
    </Flex>
  );
}

export default App;
