import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/main/ProductCard';
import useStore from '../../store/useStore'

const Product = () => {
  const [products, setProducts] = useState([]);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/v1/product/admin-products") // Replace with your backend endpoint
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };
    axios.get("https://grow-backend-kappa.vercel.app/product/admin-products",config)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // const addToCart = (productId) => {
  //   // Implement the logic for adding to cart
  //   console.log(`Adding product ${productId} to cart`);
  // };

  return (
    <div>
      <div className="bestseller-page">
        <h1>Top Items Near You</h1>
        <div className="products-grid">
          {/* {error ? (
            <p>{error}</p>
          ) : (
            products.length > 0 ? (
              
              ))
            ) : (
              <p>Loading products...</p>
            )
          )} */}


{products && products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
                productId={product.id}
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
