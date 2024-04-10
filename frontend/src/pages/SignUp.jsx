import Header from "../components/header";
import Footer from "../components/footer";
import Signup from "../components/user/signUp";
import { Flex } from "@chakra-ui/react";

const SignUpPage = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Header />
      <Flex flexGrow={1} flexDirection="column" justifyContent="center">
        <Signup />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default SignUpPage;
