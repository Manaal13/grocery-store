import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Input,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const AdminDashboard = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleApprove = (productId) => {
    console.log(`Product ${productId} approved`);
  };

  const handleReject = (productId) => {
    console.log(`Product ${productId} rejected`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/categories", {
        categoryName: newCategoryName,
      });
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setIsAddCategoryModalOpen(false);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/categories/${selectedCategory.id}`,
        {
          id: selectedCategory.id,
          categoryName: editedCategoryName,
        }
      );
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, categoryName: editedCategoryName }
            : category
        )
      );
      setIsEditCategoryModalOpen(false);
      setEditedCategoryName("");
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };


  const openAddCategoryModal = () => {
    setIsAddCategoryModalOpen(true);
  };

  const openEditCategoryModal = (category) => {
    setSelectedCategory(category);
    setIsEditCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setIsAddCategoryModalOpen(false);
  };

  const closeEditCategoryModal = () => {
    setSelectedCategory(null);
    setIsEditCategoryModalOpen(false);
  };
  return (
    <ChakraProvider>
      <Box p={4}>
        <Flex justify="space-between" align="flex-start" mb={4}>
          <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="lg" mb={4}>
              Products Awaiting Approval
            </Heading>
            {products.map((product) => (
              <Box
                key={product.id}
                bgColor="green.200"
                p={4}
                borderRadius="md"
                width="300px"
              >
                <Text fontSize="lg">{product.name}</Text>
                <Text>{product.description}</Text>
                <Button
                  colorScheme="green"
                  onClick={() => handleApprove(product.id)}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleReject(product.id)}
                >
                  Reject
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => handleProductClick(product)}
                >
                  Details
                </Button>
              </Box>
            ))}
          </VStack>

          <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="lg" mb={4}>
              User Reviews/Complaints
            </Heading>
            {reviews.map((review) => (
              <Box
                key={review.id}
                bgColor="yellow.200"
                p={4}
                borderRadius="md"
                width="300px"
              >
                <Text fontSize="lg">{review.username}</Text>
                <Text>{review.comment}</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => handleReviewClick(review)}
                >
                  View Details
                </Button>
              </Box>
            ))}
          </VStack>

          <VStack align="flex" spacing={2}>
            <Heading as="h2" size="lg" mb={4}>
              Categories
            </Heading>
            <Button colorScheme="green" onClick={openAddCategoryModal} mt={4}>
              Add Category
            </Button>
            {categories.map((category) => (
               <Box
               key={category.id}
               bgColor="green.200"
               p={4}
               borderRadius="md"
               width="300px"
               style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
             >
               <Text fontSize="lg">{category.categoryName}</Text>
               <Button
                 colorScheme="blue"
                 onClick={() => openEditCategoryModal(category)}
               >
                 Edit
               </Button>
             </Box>
            ))}
           
          </VStack>
        </Flex>

        {/* Product Modal */}
        <Modal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedProduct && selectedProduct.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{selectedProduct && selectedProduct.details}</Text>
              {/* Add more details as needed */}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => setIsProductModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Review Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedReview && selectedReview.username}'s Review
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{selectedReview && selectedReview.details}</Text>
              {/* Add more details as needed */}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => setIsReviewModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Add Category Modal */}
        <Modal isOpen={isAddCategoryModalOpen} onClose={closeAddCategoryModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={closeAddCategoryModal}
              >
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleAddCategory}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Edit Category Modal */}
        <Modal
          isOpen={isEditCategoryModalOpen}
          onClose={closeEditCategoryModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  placeholder="Enter category name"
                  value={editedCategoryName}
                  onChange={(e) => setEditedCategoryName(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={closeEditCategoryModal}
              >
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleEditCategory}>
                Save Changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default AdminDashboard;
