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
  Image,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

const AdminDashboard = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [awaitingProducts, setAwaitingProducts] = useState([]);
  const [selectedAwaitingProduct, setSelectedAwaitingProduct] = useState(null);
  const [isAwaitingProductModalOpen, setIsAwaitingProductModalOpen] =
    useState(false);

  useEffect(() => {
    const fetchAwaitingProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products?status=awaiting"
        );
        const awaitingProducts = response.data.filter(
          (product) => product.status === "awaiting"
        );
        setAwaitingProducts(awaitingProducts);
      } catch (error) {
        console.error("Error fetching awaiting products:", error);
      }
    };

    fetchAwaitingProducts();
  }, []);

  const handleAccept = async () => {
    try {
      // Make a PUT request to update the status to approved
      await axios.put(
        `http://localhost:8080/api/products/${selectedAwaitingProduct.id}`,
        { ...selectedAwaitingProduct,
          status: "approved" }
      );

      // After approval, fetch the updated list of awaiting products
      const response = await axios.get(
        "http://localhost:8080/api/products?status=awaiting"
      );
      const awaitingProducts = response.data.filter(
        (product) => product.status === "awaiting"
      );
      setAwaitingProducts(awaitingProducts);

      // Close the modal
      setIsAwaitingProductModalOpen(false);
    } catch (error) {
      console.error("Error accepting product:", error);
    }
  };

  const handleReject = async () => {
    try {console.log(selectedAwaitingProduct.id);
      // Make a PUT request to update the status to rejected
      await axios.put(
        `http://localhost:8080/api/products/${selectedAwaitingProduct.id}`,
        { ...selectedAwaitingProduct,
          status: "rejected" }
      );

      // After rejection, fetch the updated list of awaiting products
      const response = await axios.get(
        "http://localhost:8080/api/products?status=awaiting"
      );
      const awaitingProducts = response.data.filter(
        (product) => product.status === "awaiting"
      );
      setAwaitingProducts(awaitingProducts);

      // Close the modal
      setIsAwaitingProductModalOpen(false);
    } catch (error) {
      console.error("Error rejecting product:", error);
    }
  };

  const handleAwaitingProductClick = (product) => {
    setSelectedAwaitingProduct(product);
    setIsAwaitingProductModalOpen(true);
  };

  useEffect(() => {
    // Fetch complaints from local storage
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(storedComplaints);
  }, []);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isComplaintDetailsModalOpen, setIsComplaintDetailsModalOpen] =
    useState(false);

  const openComplaintDetailsModal = (complaint) => {
    setSelectedComplaint(complaint);
    setIsComplaintDetailsModalOpen(true);
  };

  const closeComplaintDetailsModal = () => {
    setSelectedComplaint(null);
    setIsComplaintDetailsModalOpen(false);
  };

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
  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/categories",
        {
          categoryName: newCategoryName,
        }
      );
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
            {awaitingProducts.map((product) => (
              <Box
              key={product.id}
              bgColor="green.200"
              p={4}
              borderRadius="md"
              width="300px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack align="start">
                <Text fontSize="lg">Product ID: {product.id}</Text>
                <Text fontSize="lg">Product Name: {product.productName}</Text>
              </VStack>
              <Button
                colorScheme="blue"
                onClick={() => handleAwaitingProductClick(product)}
              >
                Details
              </Button>
            </Box>
            
            ))}
          </VStack>

          <VStack align="flex" spacing={2}>
            <Heading as="h2" size="lg" mb={4}>
              Complaints by
            </Heading>
            {complaints.map((complaint) => (
              <Box
                key={complaint.id}
                bgColor="green.200"
                p={4}
                borderRadius="md"
                width="300px"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text fontSize="lg">{complaint.name}</Text>
                <Button
                  colorScheme="blue"
                  onClick={() => openComplaintDetailsModal(complaint)}
                >
                  {" "}
                  Details
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
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
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

        {/* Awaiting Product Modal */}
        <Modal
          isOpen={isAwaitingProductModalOpen}
          onClose={() => setIsAwaitingProductModalOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedAwaitingProduct && selectedAwaitingProduct.productName}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Image
                  src={selectedAwaitingProduct && selectedAwaitingProduct.image}
                />
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  Price: ₹
                  {selectedAwaitingProduct && selectedAwaitingProduct.price}
                </Text>
                <Text fontSize="md" mb={4}>
                  Description:{" "}
                  {selectedAwaitingProduct &&
                    selectedAwaitingProduct.description}
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" onClick={handleAccept}>
                Accept
              </Button>
              <Button colorScheme="red" onClick={handleReject}>
                Reject
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => setIsAwaitingProductModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Review Modal */}
        <Modal
          isOpen={isComplaintDetailsModalOpen}
          onClose={closeComplaintDetailsModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {selectedComplaint && selectedComplaint.name}'s Complaint
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold">
                ID: {selectedComplaint && selectedComplaint.id}
              </Text>
              <Text>Email: {selectedComplaint && selectedComplaint.email}</Text>
              <Text>
                Phone Number:{" "}
                {selectedComplaint && selectedComplaint.phoneNumber}
              </Text>
              <Box bgColor="gray.100" p={4} borderRadius="md" mt={2}>
                <Text>{selectedComplaint && selectedComplaint.concern}</Text>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeComplaintDetailsModal}>
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
