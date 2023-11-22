import React, { useState } from "react";
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
} from "@chakra-ui/react";

const AdminDashboard = () => {
  // Product List State
  const [newCategoryName,setNewCategoryName] = useState("")
  const [editedCategoryName,setEditedCategoryName] = useState("")
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is the first product description.",
      details: "Details about Product 1.",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is the second product description.",
      details: "Details about Product 2.",
    },
    // Add more products as needed
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Review List State
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "User1",
      comment: "This product is amazing!",
      details: "More details about the review from User1.",
    },
    {
      id: 2,
      username: "User2",
      comment: "Not satisfied with this product.",
      details: "Detailed complaints from User2.",
    },
    // Add more reviews as needed
  ]);

  const [selectedReview, setSelectedReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Category List State
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    // Add more categories as needed
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);

  const handleApprove = (productId) => {
    // Implement approval logic here
    console.log(`Product ${productId} approved`);
  };

  const handleReject = (productId) => {
    // Implement rejection logic here
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

  const handleAddCategory = () => {
    const newCategory = { id: Date.now(), name: newCategoryName };
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setIsAddCategoryModalOpen(false);
    setNewCategoryName("");
  };

  const handleEditCategory = () => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === selectedCategory.id
          ? { ...category, name: editedCategoryName }
          : category
      )
    );
    setIsEditCategoryModalOpen(false);
    setEditedCategoryName("");
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== categoryId)
    );
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

          <VStack align="flex-start" spacing={4}>
            <Heading as="h2" size="lg" mb={4}>
              Categories
            </Heading>
            {categories.map((category) => (
              <Box
                key={category.id}
                bgColor="green.200"
                p={4}
                borderRadius="md"
                width="300px"
              >
                <Text fontSize="lg">{category.name}</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => openEditCategoryModal(category)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              </Box>
            ))}
            <Button colorScheme="green" onClick={openAddCategoryModal} mt={4}>
              Add Category
            </Button>
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
