// components/ProductCard.js
import { useState } from 'react';
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
} from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const toast = useToast();

  const handleAddToCart = () => {
    // Retrieve existing cart data from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingItemIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update the quantity
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      const newItem = {
        id: product.id,
        productName: product.productName,
        price: product.price,
        quantity: quantity,
        image: product.image
      };

      existingCart.push(newItem);
    }

    // Save the updated cart data to local storage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    toast({
      title: 'Item added to cart',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    handleCloseModal();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset quantity to 1 when closing the modal
    setQuantity(1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} textAlign="center">
      <Center><Image src={product.image} alt={product.productName} minH="200px" maxH="200px" maxW="200px" cursor="pointer" onClick={handleOpenModal} /></Center>
      <Heading mt={2} size="md">
        {product.productName}
      </Heading>
      <Text mt={2} color="gray.500" fontWeight={"bold"} fontSize={"25px"}>
        ₹{product.price.toFixed(2)}
      </Text>
      <Button mt={2} colorScheme="blue" onClick={handleAddToCart}>
        Add to Cart
      </Button>

      {/* Product Details Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{product.productName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={product.image} alt={product.productName} maxH="400px" objectFit="cover" />

            <Heading mt={4} size="md">
              Description:
            </Heading>
            <Text>{product.description || 'No description available.'}</Text>

            <Heading mt={4} size="md">
              Category:
            </Heading>
            <Text>{product.category.categoryName || 'No category available.'}</Text>
            <Heading mt={4} size="md">
              Quantity:
            </Heading>
            <Box>
              <Button size="sm" onClick={handleDecreaseQuantity}>
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min={1}
                max={10}
                w="40px"
                textAlign="center"
                mx={2}
              />
              <Button size="sm" onClick={handleIncreaseQuantity}>
                +
              </Button>
            </Box>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
