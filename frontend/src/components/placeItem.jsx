import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const PlaceItem = ({ place }) => {
  return (
    <Box>
      <Heading as="h2" size="md" mb={2}>
        {place.name}
      </Heading>
    </Box>
  );
};

export default PlaceItem;
