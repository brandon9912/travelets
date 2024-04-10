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
  Center,
  Stack,
} from "@chakra-ui/react";
import { format, eachDayOfInterval } from "date-fns";
import { useNavigate } from "react-router-dom";

const tripCard = ({ trip }) => {
  const startDate = new Date(trip.trip_start_date);
  const endDate = new Date(trip.trip_end_date);
  const totalDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).length;
  const navigate = useNavigate();

  const handleTripInfo = () => {
    navigate("/trip/info", { state: { data: trip, days: totalDays } });
  };

  return (
    <Box
      maxW={"445px"}
      w={"450px"}
      bg={"white"}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      onClick={handleTripInfo}
    >
      <Stack>
        <Text
          color={"green.500"}
          textTransform={"uppercase"}
          fontWeight={800}
          fontSize={"sm"}
          letterSpacing={1.1}
        >
          {trip.trip_name}
        </Text>
        <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
          {trip.trip_location}
        </Heading>
        <Text color={"gray.500"}>
          {format(startDate, "yyyy/MM/dd")} - {format(endDate, "yyyy/MM/dd")}
        </Text>
      </Stack>
    </Box>
  );
};

export default tripCard;
