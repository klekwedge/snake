import { Flex } from "@chakra-ui/react";
import Apple from "../../Apple/Apple";
import Snake from "../Snake/Snake";

function Map() {
  return (
    <Flex border="5px solid black" w="500px" h="500px">
      <Snake />
      <Apple/>
    </Flex>
  );
}

export default Map;
