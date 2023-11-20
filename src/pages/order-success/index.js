// pages/thanks.js
import { Box, Heading, Text, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ThanksPage = () => {
  const router = useRouter();
  const orderNumber = '123456'; // Replace with the actual order number

  return (
    <Box p={4} textAlign="center">
      <Heading mb={4}>Thanks for Your Order!</Heading>
      <Text mb={4}>Your order number is: {orderNumber}</Text>
      <Button colorScheme="green" onClick={() => router.push('/')}>
        Continue Shopping
      </Button>
    </Box>
  );
};

export default ThanksPage;
