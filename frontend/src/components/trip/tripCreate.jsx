import React, { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

const tripCreate = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tripName, destination, startDate, endDate);
    axios
      .post("http://localhost:3005/trip/create", {
        tripName: tripName,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Box>
              <FormControl>
                <FormLabel>Trip Name</FormLabel>
                <Input type="text" />
                <FormLabel>Destination</FormLabel>
                <Input type="text" />
                <FormLabel>Start Date</FormLabel>
                <Input type="date" />
                <FormLabel>End Date</FormLabel>
                <Input type="date" />
              </FormControl>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Create Trip
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default tripCreate;
