// pages/ProductManagementPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
  } from "@chakra-ui/react";

const ProductManagementPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditingProduct(productToEdit);

    // Prefill the form with existing product data
    setNewProduct(productToEdit);

    onOpen();
  };

  const handleAddProduct = async () => {
    // Validation
    if (
      !newProduct.product_name ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.quantity ||
      !newProduct.image
    ) {
      // Handle validation error (e.g., show a toast message)
      console.error("All fields are required");
      window.alert("Please fill all fields");
      return;
    }

    if (
      isNaN(parseFloat(newProduct.price)) ||
      isNaN(parseInt(newProduct.quantity))
    ) {
      // Handle validation error for price and quantity
      console.error("Price and quantity must be valid numbers");
      return;
    }

    try {
      if (editingProduct) {
        // Editing existing product
        await axios.put(
          `http://localhost:8080/api/products/${editingProduct.id}`,
          newProduct
        );
      } else {
        // Adding new product
        await axios.post("http://localhost:8080/api/products", newProduct);
      }

      // Refetch the updated product list
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
      setEditingProduct(null);
      onClose();
    } catch (error) {
      console.error("Error adding/editing product:", error);
    }
  };

  const handleClearProduct = () => {
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      quantity: "",
      image: "",
    });
    setEditingProduct(null);
  };





  return (
    <Box p={4} bg="green.200">
      <Button
        colorScheme="teal"
        onClick={() => {
          setEditingProduct(null);
          onOpen();
        }}
        mb={4}
      >
        Add Product
      </Button>

      {/* Add Product Form Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProduct ? "Edit Product" : "Add New Product"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={newProduct.product_name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
              >
                {/* Add your category options here */}
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
              {editingProduct ? "Save Changes" : "Submit"}
            </Button>
            <Button onClick={handleClearProduct}>Clear</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Display existing products */}
      <SimpleGrid columns={3} spacing={4}>
        {products.map((product) => (
          <Box
            key={product.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            onClick={() => handleEditProduct(product.id)}
            cursor="pointer"
          >
            <p>{product.product_name}</p>
            <p>{product.price}</p>
            <p>{product.category.category_name}</p>
            <p>{product.quantity}</p>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductManagementPage;
