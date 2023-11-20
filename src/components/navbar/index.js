import {Link,Icon,
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

// import { useCart } from '../context/CartContext'; // Import your cart context hook

const NavBar = () => {
  // const { cartItems } = useCart();

  return (
    <Box bg="green.900" p={4} position="sticky" top={0} zIndex={999}>
      <Flex align="center">
        {/* Left buttons */}
        <Link href="/">
          <Icon as={FaHome} boxSize={6} color="white" colorScheme="whiteAlpha"     mt={1} mr={3}/>
   
        </Link>
        <Button colorScheme="whiteAlpha" mr={2}>
          All Products
        </Button>
        <Button colorScheme="whiteAlpha" mr={2}>
          Categories
        </Button>
        <Button colorScheme="whiteAlpha">
          <a href="/complaint-form">Contact Us</a>
        </Button>

        {/* Center search bar */}
        <Spacer />
        <InputGroup w="50%">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input type="text" placeholder="Search" />
        </InputGroup>

        {/* Right icons */}
        <Spacer />
        <IconButton
          aria-label="Wallet"
          icon={<FaWallet />}
          colorScheme="whiteAlpha"
          mr={2}
        />
        <IconButton
          aria-label="Cart"
          icon={<Badge colorScheme="red">{5}</Badge>} //  cartItems.length
          colorScheme="whiteAlpha"
          mr={2}
        />
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