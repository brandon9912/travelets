import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import SignIn from "../components/signIn";

const LoginPage = () => {
  return (
    <>
      <Header />
      <SignIn />
      <Footer />
    </>
  );
};

export default LoginPage;
