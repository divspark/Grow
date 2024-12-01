import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const ProductCard = ({ product: { id, photo, name, price }, addToCart }) => {
  const handleAddToCart = () => {
    if (addToCart && id) {
      addToCart(id);
    } else {
      console.error("Product ID or addToCart function is missing.");
    }
  };

  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <div className="product-content">
        <h2>{name}</h2>
        <div className="bscontent-icon">
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={farStar} />
        </div>
        <div className="product-price">${price}</div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
