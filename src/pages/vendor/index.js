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
import { Image } from "@chakra-ui/react";

const ProductManagementPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: "",
    status: "awaiting",
  });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        // Filter products with status 'approved'
        const approvedProducts = response.data.filter(
          (product) => product.status === "approved"
        );
        setProducts(approvedProducts);
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
    // Validation code...

    try {
      const productData = { ...newProduct, status: "awaiting" }; // Include the status field
      if (editingProduct) {
        // Editing existing product
        await axios.put(
          `http://localhost:8080/api/products/${editingProduct.id}`,
          productData
        );
      } else {
        // Adding new product
        await axios.post("http://localhost:8080/api/products", productData);
      }

      // Refetch the updated product list
      const response = await axios.get("http://localhost:8080/api/products"); 
      const approvedProducts = response.data.filter(
        (product) => product.status === "approved"
      );
      setProducts(approvedProducts);
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

  const handleCloseModal = () => {
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      quantity: "",
      image: "",
    });
    onClose();
  };

  const handleSelectChange = (e) => {
    const index = e.target.value;
    const category = categories[index];
    setNewProduct({ ...newProduct, category: category });
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
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
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
                name="productName"
                value={newProduct.productName}
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
                value={newProduct.category.category_name}
                onChange={handleSelectChange}
              >
                {/* Add your category options here */}
                {categories.map((category, index) => {
                  return (
                    <option
                      value={index}
                      key={category.id}
                      style={{ color: "black" }}
                    >
                      {category.categoryName}
                    </option>
                  );
                })}
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
            <p>{product.productName}</p>
            <p>₹{product.price}</p>
            <p>{product.category.category_name}</p>
            <Image
              src={product.image}
              alt={product.productName}
              maxH="100px"
              objectFit="cover"
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductManagementPage;
