// pages/CartPage.js
import { Box, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { useCart } from '@/context/cartcontext';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  console.log('CartPage updated with cartItems:', cartItems);

  const toast = useToast();

  

  const handleCheckout = () => {
    // Add your checkout logic here
    toast({
      title: 'Checkout Successful!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    clearCart(); // Clear the cart after successful checkout
  };

  return (
    <Box p={4}>
      <Heading mb={4}>Shopping Cart</Heading>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          {cartItems.map(({ product, quantity }) => (
            <Box key={product.id} mb={4}>
              <Image src={product.image} alt={product.name} maxH="100px" mr={4} />
              <Text>{product.name}</Text>
              <Text>${product.price.toFixed(2)} each</Text>
              <Text>Quantity: {quantity}</Text>
            </Box>
          ))}
          <Button colorScheme="blue" onClick={handleCheckout} mt={4}>
            Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default CartPage;
