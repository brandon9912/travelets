import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Header from "../components/header";
import Footer from "../components/footer";
import PlaceCard from "../components/trip/placeCard";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import {
  Input,
  Select,
  SkeletonText,
  Box,
  Flex,
  Heading,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { format, eachDayOfInterval } from "date-fns";
import swal from "sweetalert2";

const TripInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Google Map
  const [center, setCenter] = useState(null);
  const [marker, setMarker] = useState(null);
  // Nearby Places
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState([]);
  // Trip Plan

  const [tripPlan, setTripPlan] = useState({});
  const [trip, setTrip] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const [totalDays, setTotalDays] = useState(1);
  const [dateArray, setDateArray] = useState([]);

  function generateDateArray(startDate, endDate) {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    return dates.map((date) => format(date, "MM/dd/yyyy"));
  }

  const trip_id = location.state.data._id;
  useEffect(() => {
    const getTripPlan = async () => {
      const result = await api.getTripbyId(trip_id);
      console.log(result);
      setTrip(result.data.data);
      setTripPlan(result.data.data.trip_plan);
      let startDate = new Date(result.data.data.trip_start_date);
      let endDate = new Date(result.data.data.trip_end_date);
      setStartDate(startDate);
      setEndDate(endDate);
      setDateArray(generateDateArray(startDate, endDate));
    };
    getTripPlan();
  }, []);

  useEffect(() => {
    const getTrip = async () => {
      const location = await api.getPlacesbyKeyword(trip.trip_location);
      console.log(location);
      setCenter(location.data.data.results[0].geometry.location);
      const result = await api.getNearbyPlaces(
        trip.trip_location,
        10000,
        location.data.data.results[0].geometry.location.lat,
        location.data.data.results[0].geometry.location.lng
      );
      setPlaces(result.data.data.results);
      setTotalDays();
    };
    getTrip();
  }, [trip]);

  const handleChildStateChange = (placeDetail) => {
    setMarker(placeDetail.geometry.location);
    setCenter(placeDetail.geometry.location);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const getItemStyle = (draggableStyle) => ({
    ...draggableStyle,
    userSelect: "none",
    width: "auto",
    align: "center",
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (
      result.source.droppableId === "nearbyplaces" &&
      result.destination.droppableId === "tripplan"
    ) {
      const draggedPlace = places[sourceIndex];
      const updatedPlan = { ...tripPlan };
      if (!updatedPlan[selectedDay]) {
        updatedPlan[selectedDay] = [];
      }
      updatedPlan[selectedDay].splice(destinationIndex, 0, { ...draggedPlace });
      setTripPlan(updatedPlan);

      // Remove the dragged place from the nearby places
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.place_id !== draggedPlace.place_id)
      );
      console.log("Trip Plan: ", tripPlan);
      console.log("Places: ", places);
    } else if (
      result.source.droppableId === "tripplan" &&
      result.destination.droppableId === "tripplan"
    ) {
      const updatedPlaces = [...tripPlan[selectedDay]];
      const [draggedPlace] = updatedPlaces.splice(sourceIndex, 1);
      updatedPlaces.splice(destinationIndex, 0, draggedPlace);
      const updatedPlan = { ...tripPlan, [selectedDay]: updatedPlaces };
      setTripPlan(updatedPlan);
    } else if (
      result.source.droppableId === "tripplan" &&
      result.destination.droppableId === "nearbyplaces"
    ) {
      const removedPlace = tripPlan[selectedDay][sourceIndex];
      const updatedPlan = { ...tripPlan };
      updatedPlan[selectedDay] = updatedPlan[selectedDay].filter(
        (_, index) => index !== sourceIndex
      );
      setTripPlan(updatedPlan);

      // Add the removed place back to the nearby places
      setPlaces((prevPlaces) => [...prevPlaces, removedPlace]);
    }
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    const result = await api.getPlacesbyKeyword(keyword);
    setCenter(result.data.data.results[0].geometry.location);
    console.log(result.data.data.results[0].geometry.location);
    // const nearbyPlaces = await api.getNearbyPlaces(
    //   keyword,
    //   10000,
    //   result.data.data.results[0].geometry.location.lat,
    //   result.data.data.results[0].geometry.location.lng
    // );
    // console.log(nearbyPlaces);
    setPlaces(result.data.data.results);
  };

  const handleSaveTrip = async () => {
    console.log(tripPlan);
    const data = {
      trip_name: trip.trip_name,
      trip_location: trip.trip_location,
      trip_start_date: trip.trip_start_date,
      trip_end_date: trip.trip_end_date,
      trip_plan: tripPlan,
    };
    try {
      const result = await api.updateTripbyId(data, trip_id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    swal
      .fire({
        title: "Trip Plan Saved!",
        text: "You will be redirected to your profile page",
        icon: "success",
        confirmButtonText: "OK",
      })
      .then(() => {
        navigate("/profile");
      });
  };

  return (
    <>
      <Flex direction={"column"}>
        <Header />
        <Flex
          direction={{ base: "column", md: "row" }}
          h="100vh"
          w="100vw"
          justify={"space-between"}
          align={"center"}
        >
          {/* Google Map */}
          <Box h="80vh" w="40vw" m={"2"}>
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker position={center} />
              {marker && <Marker position={marker} />}
            </GoogleMap>
          </Box>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Nearby Places */}
            <Stack align={"center"}>
              <Heading>周圍景點</Heading>
              <Box mb={4} w={"auto"} align={"center"}>
                <Input
                  placeholder="Search for attractions"
                  onChange={handleKeywordChange}
                />
                <Button onClick={handleSearch}> Search </Button>
              </Box>
              <Droppable droppableId="nearbyplaces">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    h="60vh"
                    w="25vw"
                    overflow={"auto"}
                    align={"center"}
                    mx={"2"}
                  >
                    {places.map((place, index) => (
                      <Draggable
                        key={place.place_id}
                        draggableId={place.place_id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                          >
                            <PlaceCard
                              place={place}
                              key={place.place_id}
                              onChange={handleChildStateChange}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Stack>
            {/* Trip Plan */}
            <Stack align={"center"}>
              <Heading>行程規劃</Heading>
              <Box mb={4} align={"center"}>
                <label htmlFor="daySelect">Select Day: </label>
                <Select
                  id="daySelect"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  {dateArray.map((date, index) => (
                    <option key={index + 1} value={`Day ${index + 1}`}>
                      Day {index + 1} ({date})
                    </option>
                  ))}
                </Select>
              </Box>
              <Droppable droppableId="tripplan">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    h="60vh"
                    w="25vw"
                    overflow={"auto"}
                    align={"center"}
                    borderWidth="1px"
                    borderRadius="lg"
                    mx={"2"}
                  >
                    {tripPlan[selectedDay] &&
                      tripPlan[selectedDay].map((place, index) => (
                        <Draggable
                          key={place.place_id}
                          draggableId={place.place_id}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <PlaceCard
                                place={place}
                                key={place.place_id}
                                onChange={handleChildStateChange}
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
              <Button onClick={handleSaveTrip}>儲存行程</Button>
            </Stack>
          </DragDropContext>
        </Flex>

        <Footer />
      </Flex>
    </>
  );
};

export default TripInfo;
