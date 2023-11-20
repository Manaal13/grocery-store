import Head from "next/head";
import Image from "next/image";
import { Text, Box } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import ProductList from "@/components/productlist";
import { ChakraProvider, Container } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <center>
        <img
          src="https://bigbfreshstore.com/wp-content/uploads/2019/07/banner_12-1294x372.jpg"
          alt="Your Image"
          maxWidth="auto"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </center>
      <ChakraProvider>
        <Container maxW="90%" mt={8}>
          <center>
            <Box bg="green.200" p={4}>
              <Text fontSize="xl" fontWeight="bold"> 
                Top Selling Products
              </Text>
            </Box>
          </center>
          <ProductList />
        </Container>
      </ChakraProvider>
    </div>
  );
}
