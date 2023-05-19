import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import PlaceItem from "./placeItem.jsx";

const placeList = ({ places }) => {
  return (
    <Flex direction="column" align="center" justify="center">
      {places.map((place) => (
        <Box key={place.id} mb={8} w="100%">
          <PlaceItem place={place} />
        </Box>
      ))}
    </Flex>
  );
};

export default placeList;
