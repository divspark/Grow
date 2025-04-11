import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader, Center } from '@mantine/core'; // Import Mantine Loader
import ProductCard from '../../components/main/ProductCard';
import useStore from '../../store/useStore';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    axios
      .get("https://grow-backend-pi.vercel.app/product/admin-products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Stop loading after products are fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false); // Stop loading in case of an error
      });
  }, []);

  return (
    <div>
      <div className="bestseller-page">
        <h1>Top Items Near You</h1>
        <div className="products-grid">
          {loading ? ( // Show Loader while loading
            <Center style={{ minHeight: '200px' }}>
              <Loader size="lg" />
            </Center>
          ) : products && products.length > 0 ? ( // Show products if available
            products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                stock={product.stock}
                photo={product.photo}
                addToCart={addToCart}
                handler={() => {}}
              />
            ))
          ) : (
            <p>No products available.</p> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
