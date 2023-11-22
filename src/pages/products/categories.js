import React, { useEffect, useState } from 'react';
import { SimpleGrid, Heading, Box, Link, Text, IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import ProductCard from '../../components/productcard';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category.categoryName] = acc[product.category.categoryName] || [];
    acc[product.category.categoryName].push(product);
    return acc;
  }, {});

  const categories = Object.keys(groupedProducts);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top Anchor */}
      <IconButton
        icon={<ArrowUpIcon />}
        size="lg"
        position="fixed"
        bottom="4"
        right="4"
        bgColor="green.500"
        color="white"
        onClick={scrollToTop}
      />

      {/* Render a list of all product categories as anchors */}
      <Box mb={4}>
        {categories.map((category) => (
          <Link key={category} href={`#${category}`} ml={4} fontSize="xl" color="green.500">
            {category}
          </Link>
        ))}
      </Box>

      {/* Render product cards sorted by category with category headings */}
      {categories.map((category) => (
        <Box key={category} id={category} mb={8}>
          <Box
            bg="green.100"
            p={2}
            borderRadius="md"
            display="inline-block"
            mb={4}
            width={"100%"}
          >
           <center> <Heading mb={2} fontSize="2xl" color="green.500" >
              {category}
            </Heading></center>
          </Box>
          <SimpleGrid columns={3} spacing={4}>
            {groupedProducts[category].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </>
  );
};

export default ProductList;
