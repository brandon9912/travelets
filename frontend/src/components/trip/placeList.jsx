import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PlaceItem from "./placeCard";

const placeList = ({ places, onChange }) => {
  const [placeList, setPlaceList] = useState([]);

  useEffect(() => {
    setPlaceList(places);
  }, [places]);

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    userSelect: "none",
    width: "540px",
  });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      placeList,
      result.source.index,
      result.destination.index
    );
    setPlaceList(items);
    console.log(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <VStack
            {...provided.droppableProps}
            ref={provided.innerRef}
            borderTopRadius={6}
            alignItems="center"
            spacing={0}
          >
            {placeList.map((place, index) => (
              <Draggable
                key={place.place_id}
                draggableId={place.place_id + ""}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <PlaceItem
                      key={place.place_id}
                      id={place.place_id}
                      place={place}
                      onChange={onChange}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default placeList;
