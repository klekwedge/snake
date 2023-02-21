import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Flex, Heading } from "@chakra-ui/react";

interface CustomPanelProps {
  title: string;
  colors: string[];
  buttonHandler: (color: string) => void;
  defaultColor: string;
}

function CustomPanel({ title, colors, buttonHandler, defaultColor }: CustomPanelProps) {
  const [currentColor, setCurrentColor] = useState(defaultColor);

  function clickHandler(color: string) {
    setCurrentColor(color);
    buttonHandler(color);
  }

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="20px"
    >
      <Heading as="h2" fontWeight="500" fontSize='35px'>
        {title}
      </Heading>
      <Flex gap="15px" alignItems="center" justifyContent="center">
        <Flex gap="3px" fontSize="20px" background='white' p='10px' borderRadius='5px'>
          {colors.map((item) => (
            <Box
              background={item}
              key={uuidv4()}
              width="20px"
              h="20px"
              cursor="pointer"
              onClick={() => clickHandler(item)}
              border={`${currentColor === item ? "3px solid white" : `3px solid ${item}`}`}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CustomPanel;
