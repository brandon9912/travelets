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

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    if (result.status === "success") {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.data));
      window.location.href = "/";
    }

    if (result.status === "error") {
      alert(result.error);
      window.location.href = "/signin";
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
