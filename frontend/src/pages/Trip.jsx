import React, { useEffect } from "react";
import axios from "axios";
import { GoogleMap } from "@react-google-maps/api";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PlaceList from "../components/placeList.jsx";

const config = {
  method: "get",
  url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=123%20main%20street&location=42.3675294%2C-71.186966&radius=10000&key=${
    import.meta.env.VITE_GOOGLE_API_KEY
  }`,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  },
};

const Trip = () => {
  const [text, setText] = React.useState("");
  const [places, setPlaces] = React.useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios(config);
      console.log(response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={5}>
        Trip
      </Heading>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <PlaceList places={places} />
    </Box>
  );
};

export default Trip;
