import React, { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Trip_Create from "../components/trip/tripCreate";

const TripCreate = () => {
  return (
    <>
      <Header />
      <Trip_Create />
      <Footer />
    </>
  );
};

export default TripCreate;
