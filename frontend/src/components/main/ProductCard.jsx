import React from 'react';
import { FaPlus } from "react-icons/fa";

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  addToCart,
}) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={photo} alt={name} />
      </div>
      <p>{name}</p>
      <span>₹{price}</span>
      <div className='svg'>
        <button onClick={() => addToCart(productId)}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
