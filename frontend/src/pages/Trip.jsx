import React, { useEffect } from "react";
import axios from "axios";
import { GoogleMap } from "@react-google-maps/api";
import { Box, Flex, Heading, Text, Card } from "@chakra-ui/react";
import PlaceList from "../components/PlaceList.jsx";

const address = "localhost:3005/api/v1/trip/google-map-places";

const Trip = () => {
  //   const [text, setText] = React.useState("");

  //   const handleSearchSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await axios.get(address, {
  //         params: {
  //           keyword: text,
  //           radius: 5000,
  //         },
  //       });
  //       console.log(response.json());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={5}>
        Trip
      </Heading>
      <PlaceList />
    </Box>
  );
};

export default Trip;
