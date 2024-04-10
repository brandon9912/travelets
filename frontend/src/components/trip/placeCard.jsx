import React, { useState, useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
} from "@chakra-ui/react";
import { DragHandleIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import api from "../../utils/api";

const placeCard = ({ place, onChange }) => {
  const [placeDetail, setPlaceDetail] = useState(null);

  const handlePlaceDetail = async (e) => {
    e.preventDefault();
    const result = await api.getPlaceDetail(place.place_id);

    setPlaceDetail(result.data.data.result);
    onChange(result.data.data.result);
  };

  return (
    <>
      <Card
        direction={{ base: "row", md: "row" }}
        variant="outline"
        align="center"
        justify={"space-between"}
        width={"300px"}
        height={"90px"}
        rounded={"lg"}
        my={"1"}
      >
        <CardBody>
          <Text>
            {place.name.length > 20
              ? place.name.slice(0, 20) + "..."
              : place.name}
          </Text>
        </CardBody>
        <Flex>
          <InfoOutlineIcon mr={2} onClick={handlePlaceDetail} />
        </Flex>
        <Flex>
          <DragHandleIcon pr={1} />
        </Flex>
      </Card>
    </>
  );
};

export default placeCard;
