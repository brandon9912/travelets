import React, { useState } from "react";
import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

const tripCreate = () => {
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
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default tripCreate;
