import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { GoogleMap } from "@react-google-maps/api";
import { Center } from "@chakra-ui/react";
import PlaceList from "../components/trip/placeList";

const Trip = () => {
  return (
    <>
      <Header />
      <Center align="center" my={"5"}>
        <PlaceList />
      </Center>
      <Footer />
    </>
  );
};

export default Trip;
