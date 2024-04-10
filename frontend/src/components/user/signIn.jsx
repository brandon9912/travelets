import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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
import { Link as RouteLink } from "react-router-dom";

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailError = email === "";
  const isPasswordError = password === "";

  const handleuserEmail = (e) => {
    setEmail(e.target.value);
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
            to enjoy cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={isEmailError} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleuserEmail} />
              {!isEmailError ? (
                <FormHelperText>Enter email to login</FormHelperText>
              ) : (
                <FormErrorMessage>Email is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="password" isInvalid={isPasswordError} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handleuserPassword} />
              {!isPasswordError ? (
                <FormHelperText>Enter password to login</FormHelperText>
              ) : (
                <FormErrorMessage>Password is required</FormErrorMessage>
              )}
            </FormControl>
            <Stack spacing={3}>
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
              <Button
                bg={"blue.200"}
                color={"white"}
                _hover={{
                  bg: "blue.300",
                }}
                type="submit"
                as={RouteLink}
                to={"/signup"}
              >
                Sign Up
              </Button>
              {/* <Stack
                direction={{ base: "column", sm: "row" }}
                align={"center"}
                justify={"space-between"}
              >
                <Link color={"blue.400"} as={RouteLink} to={"/signup"}>Sign Up</Link>
              </Stack> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
