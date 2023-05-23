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
    <Card
      direction={{ base: "row", md: "row" }}
      variant="outline"
      align="center"
      justify={"center"}
      width={"300px"}
      height={"80px"}
      rounded={"lg"}
      my={"1"}
    >
      <CardBody>
        <Text>
          {" "}
          {place.name.length > 20
            ? place.name.slice(0, 20) + "..."
            : place.name}
        </Text>
        <Text mb={2}>Rating: {place.rating}</Text>
      </CardBody>
    </Card>
  );
};

export default placeCard;
