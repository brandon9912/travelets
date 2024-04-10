import React, { useState, useEffect } from "react";
import { Link as RouteLink } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

const Links = [{ name: "Home", link: "/" }];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    as={RouteLink}
    to={children.link}
  >
    {children.name}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoggedin, setIsLoggedin] = useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedin(true);
    }
  }, []);

  const handleuserLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedin(false);
    window.location.href = "/";
  };

  const handleProfile = (e) => {
    e.preventDefault();
    window.location.href = "/profile";
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} w={"100%"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              onClick={() => {
                window.location.href = "/";
              }}
              cursor={"pointer"}
            >
              <Text fontSize={"lg"} fontWeight={"bold"}>
                Trave
                <Text as={"span"} color={"#76C450"}>
                  lets
                </Text>
              </Text>
            </Box>
            {/* <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </HStack> */}
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"green"}
              bg={"#76C450"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              <Link as={RouteLink} to={"/create"}>
                Create Trip
              </Link>
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList>
                {isLoggedin ? (
                  <>
                    <MenuItem onClick={handleProfile}>
                      Personal Profile
                    </MenuItem>
                    {/* <MenuItem>Link 2</MenuItem> */}
                    <MenuDivider />
                    <MenuItem onClick={handleuserLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Link as={RouteLink} to={"/signin"}>
                        Signin
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link as={RouteLink} to={"/signup"}>
                        Signup
                      </Link>
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
