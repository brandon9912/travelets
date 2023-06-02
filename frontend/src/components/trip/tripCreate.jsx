import React, { useState } from "react";
import api from "../../utils/api";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

const tripCreate = () => {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dailyBudget, setDailyBudget] = useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      swal
        .fire({
          title: "Please login first",
          text: "You will be redirected to login page",
          icon: "warning",
          confirmButtonText: "OK",
        })
        .then(() => {
          navigate("/signin");
        });
    }
  }, []);

  const handleTripName = (e) => {
    setTripName(e.target.value);
  };

  const handleDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleDailyBudget = (e) => {
    setDailyBudget(e.target.value);
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();

    let data = {
      trip_name: tripName,
      trip_location: destination,
      trip_start_date: startDate,
      trip_end_date: endDate,
      trip_daily_budget: dailyBudget,
    };

    let days = (Date.parse(endDate) - Date.parse(startDate)) / 86400000 + 1;
    const result = await api.createTrip(data);
    console.log(result);

    if (result.data.status === "success") {
      swal
        .fire({
          title: "Create Trip Success",
          text: "Please continue to add your trip details",
          icon: "success",
          confirmButtonText: "OK",
        })
        .then(() => {
          navigate("/plan", {
            state: { data: result.data.data, days: days },
          });
        });
    } else {
      swal.fire({
        title: "Create Trip Failed",
        text: "Please try again",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
          <Heading> Create Your Trip </Heading>
          <Stack spacing={3} align={"center"}>
            <FormControl>
              <Stack spacing={2}>
                <FormLabel>Trip Name</FormLabel>
                <Input type="text" onChange={handleTripName} required />
                <FormLabel>Destination</FormLabel>
                <Input type="text" onChange={handleDestination} required />
                <FormLabel>Start Date</FormLabel>
                <Input type="date" onChange={handleStartDate} required />
                <FormLabel>End Date</FormLabel>
                <Input type="date" onChange={handleEndDate} required />
                <FormLabel>Daily Budget</FormLabel>
                <Input type="number" onChange={handleDailyBudget} />
              </Stack>
            </FormControl>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              onClick={handleCreateTrip}
            >
              Create Trip
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default tripCreate;
