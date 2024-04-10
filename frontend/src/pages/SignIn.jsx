import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import SignIn from "../components/user/signIn";
import { Flex } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      <Flex flexGrow={1} flexDirection="column" justifyContent="center">
        <SignIn />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default LoginPage;
