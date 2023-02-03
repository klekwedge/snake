import { Flex } from "@chakra-ui/react";
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
      gap="30px"
    >
      <Map />
      {/* <Score /> */}
    </Flex>
  );
}

export default App;
