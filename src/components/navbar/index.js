import {
  Icon,
  Box,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaWallet, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { useCart } from '../context/CartContext'; // Import your cart context hook

const NavBar = () => {
 
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // Retrieve cart data from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  return (
    <Box bg="green.900" p={4} position="sticky" top={0} zIndex={999}>
      <Flex align="center">
        {/* Left buttons */}
        <Link href="/">
          <Icon
            as={FaHome}
            boxSize={6}
            color="white"
            colorScheme="whiteAlpha"
            mt={1}
            mr={3}
          />
        </Link>
        <Button colorScheme="whiteAlpha" mr={2}>
        <Link href="/products/all">
          All Products
          </Link>
        </Button>
        <Button colorScheme="whiteAlpha" mr={2}>
        <Link href="/products/categories">
          Categories</Link>
        </Button>
        <Button colorScheme="whiteAlpha">
          <Link href="/complaint-form">
            Contact Us
          </Link>
        </Button>

    

        {/* Right icons */}
        <Spacer />
        <IconButton
          aria-label="Wallet"
          icon={<FaWallet />}
          colorScheme="whiteAlpha"
          mr={2}
        />
        <Link href={"/cart-page"}><IconButton
          aria-label="Cart"
         icon={<FaShoppingCart/>}
          colorScheme="whiteAlpha"
          
          mr={2}
        />
        </Link>
        <IconButton
          aria-label="Logout"
          icon={<FaSignOutAlt />}
          colorScheme="whiteAlpha"
        />
      </Flex>
    </Box>
  );
};

export default NavBar;