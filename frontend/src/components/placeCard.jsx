import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const placeCard = ({ place }) => {
  return (
    // <Box id={place.id}>
    //   <Heading as="h2" size="md" mb={2}>
    //     {place.name}
    //   </Heading>
    //   <Text mb={2}>Rating Amount: {place.user_ratings_total}</Text>
    //   <Text mb={2}>Rating: {place.rating}</Text>
    // </Box>
    <Card direction={{ base: "column", sm: "row" }} variant="outline">
      <CardHeader>{place.name}</CardHeader>
      <CardBody>
        <Text mb={2}>Rating Amount: {place.user_ratings_total}</Text>
        <Text mb={2}>Rating: {place.rating}</Text>
      </CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

export default placeCard;
