import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import api from "../../utils/api";
import swal from "sweetalert2";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleuserEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handleuserPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleuserLogin = async (e) => {
    e.preventDefault();

    let data = {
      email: email,
      password: password,
    };
    const result = await api.signin(data);
    console.log(result);

    if (result.data.status === "success") {
      // alert(result.data.message);
      localStorage.setItem("token", result.data.data.access_token);

      if (!window.localStorage.getItem("token")) {
        console.log("jwtfail");
        swal
          .fire({
            title: "Login Failed",
            text: "Please try again",
            icon: "error",
            confirmButtonText: "OK",
          })
          .then(() => {
            window.location.href = "/signin";
          });
      } else {
        swal
          .fire({
            title: "Login Success",
            text: "You are now logged in",
            icon: "success",
            confirmButtonText: "OK",
          })
          .then(() => {
            window.location.href = "/";
          });
      }
    }

    if (result.data.status === "error") {
      swal
        .fire({
          title: "Login Failed",
          text: result.data.message,
          icon: "error",
          confirmButtonText: "OK",
        })
        .then(() => {
          window.location.href = "/signin";
        });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleuserEmail} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handleuserPassword} />
            </FormControl>
            <Stack spacing={10}>
              {/* <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack> */}
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                onClick={handleuserLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
