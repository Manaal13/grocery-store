import { useState, useEffect } from 'react';
import { Box, Heading, Text, Link, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const OrderSuccessPage = () => {
  const router = useRouter();

  
  const handleRedirect = () => {
    router.push('/');
  };

  return (
    <Box textAlign="center" p={8}>
      <Heading mb={4} fontSize="2xl">
        🎉 Thank you for your order! 🎉
      </Heading>

      <Text mb={4}>
        Your order has been successfully placed. Here are the details:
      </Text>

      <Text mb={4}>
        Order Number: #123456
      </Text>

      <Button colorScheme="teal" onClick={handleRedirect}>
        Continue Shopping
      </Button>

      <Text mt={4}>
        If you have any questions, please <Link color="teal.500" href="/contact">contact us</Link>.
      </Text>
    </Box>
  );
};

export default OrderSuccessPage;
