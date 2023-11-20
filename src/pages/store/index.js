import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Flex, Heading } from "@chakra-ui/react";
import { getPlaceholderData } from "@/service";
const store = () => {

  const [userData , setUserData] = useState([]);
  useEffect( () => {
    console.log("Hello")
  }, []);

  return (
    <Flex direction="column" align="center">
      <Heading>Hello</Heading>
    </Flex>
  );
};

export default store;
