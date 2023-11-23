// CartPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Spacer,
  useToast,
  Image,
  Grid,
  Link,
} from "@chakra-ui/react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Retrieve cart data from local storage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    // Update cart state and local storage
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleIncreaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    updateCart(newCart);
  };

  const handleDecreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      updateCart(newCart);
    }
  };

  const handleRemoveItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const handlePlaceOrder = async () => {
    // Create the payload based on the cart items
    const orderPayload = cart.map((item, index) => {
      return {
        user: {
          id: 1, // Replace with the appropriate user ID
        },
        totalAmount: item.price * item.quantity,
        orderDate: new Date().toISOString(), // Use the current date and time
        status: "Payment RCVD", // Alternating status for demonstration purposes
        product: {
          id: item.id, // Replace with the appropriate product ID
        },
        quantity: item.quantity,
      };
    });
    
    

    try {console.log(orderPayload);
      // Send the orderPayload to your backend API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/orders/create-multiple",
        orderPayload
      );

      // Display a success message
      toast({
        title: "Order Placed Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Update the cart and local storage
      updateCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error placing order:", error);

      // Display an error message
      toast({
        title: "Error Placing Order",
        description:
          "An error occurred while placing your order. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Grid templateColumns="50% 50%" gap={8} p={4}>
      {/* Cart Items */}
      <Box>
        <Heading mb={4}>Shopping Cart</Heading>
        {cart.map((item, index) => (
          <Flex key={index} align="center" mb={4}>
            <Image
              src={item.image}
              alt={item.productName}
              maxH="100px"
              maxW="100px"
              mr={4}
            />
            <Box flex="1">
              <Text fontWeight="bold">{item.productName}</Text>
              <Text>₹{item.price.toFixed(2)}</Text>
            </Box>
            <Spacer />
            <Box>
              <Button size="sm" onClick={() => handleDecreaseQuantity(index)}>
                -
              </Button>
              <Text mx={2}>{item.quantity}</Text>
              <Button size="sm" onClick={() => handleIncreaseQuantity(index)}>
                +
              </Button>
            </Box>
            <Button
              ml={4}
              colorScheme="red"
              onClick={() => handleRemoveItem(index)}
            >
              Remove
            </Button>
          </Flex>
        ))}
      </Box>

      {/* Total Section */}
      <Box bg="gray.200" p={4} borderRadius="md" my={"auto"}>
        <center>
          <Heading mb={4} fontSize="xl" fontWeight="bold">
            Total
          </Heading>
          <Text fontSize="2xl" fontWeight="bold">
            ₹{calculateTotal().toFixed(2)}
          </Text>
          {cart.length > 0 && (
            <Link href="order-success">
              <Button
                mt={4}
                colorScheme="blue"
                onClick={handlePlaceOrder}
                isDisabled={cart.length === 0} // Disable the button when cart is empty
              >
                Place Order
              </Button>
            </Link>
          )}
        </center>
      </Box>
    </Grid>
  );
};

export default CartPage;
