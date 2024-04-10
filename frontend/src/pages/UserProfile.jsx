import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Profile from "../components/user/profile";
import TripCard from "../components/trip/tripCard";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Stack,
  Button,
  Heading,
  Text,
  Box,
  Center,
  Avatar,
  Badge,
  Flex,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("You need to login first");
      navigate("/signin");
    }
    async function getUser() {
      const result = await api.getUserProfile();
      setUser(result.data.user);
    }
    async function getTrip() {
      const result = await api.getTripbyUserId();
      setTrips(result.data.data);
      console.log(result.data.data);
    }
    getUser();
    getTrip();
  }, []);

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      <Flex flexGrow={1} flexDirection="column" justifyContent="center">
        <Center>
          <Heading
            color={"gray.700"}
            fontSize={"6xl"}
            fontFamily={"body"}
            my={"5"}
          >
            {user.username}'s Trips
          </Heading>
        </Center>
        <Center>
          <Text>
            You have {trips.length} {trips.length > 1 ? "trips" : "trip"}
          </Text>
        </Center>
        <Center>
          <Flex flexWrap={"wrap"} my={"10"}>
            {trips.map((trip) => (
              <Center
                py={1}
                flexBasis={{ base: "100%", sm: "50%", md: "33%" }}
                margin={"auto"}
                key={trip._id}
              >
                <TripCard trip={trip} />
              </Center>
            ))}
          </Flex>
        </Center>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default ProfilePage;
