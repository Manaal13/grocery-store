// components/ProductList.js
import { SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../productcard';

const dummyProducts = [
  { id: 1, name: 'Product 1', image: 'https://placekitten.com/300/200', price: 19.99 },
  { id: 2, name: 'Product 2', image: 'https://placekitten.com/300/200', price: 29.99 },
  { id: 3, name: 'Product 3', image: 'https://placekitten.com/300/200', price: 39.99 },
  { id: 4, name: 'Product 4', image: 'https://placekitten.com/300/200', price: 19.99 },
  { id: 5, name: 'Product 5', image: 'https://placekitten.com/300/200', price: 19.99 },
];

const ProductList = () => {
  return (
    <SimpleGrid columns={5} spacing={4}>
      {dummyProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
