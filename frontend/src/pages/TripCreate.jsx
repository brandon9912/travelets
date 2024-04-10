import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Trip_Create from "../components/trip/tripCreate";
import { Flex } from "@chakra-ui/react";

const TripCreate = () => {
  return (
    <Flex minHeight="100vh" flexDirection={"column"}>
      <Header />
      <Flex flexGrow={1} flexDirection="column" justifyContent="center">
        <Trip_Create />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default TripCreate;
