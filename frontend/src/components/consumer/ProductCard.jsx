import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.photo} alt={product.name} />
      <div className="product-content">
        <h2>{product.name}</h2>
        <div className="bscontent-icon">
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={fasStar} />
          <FontAwesomeIcon icon={farStar} />
        </div>
        <div className="product-price">${product.price}</div>
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;