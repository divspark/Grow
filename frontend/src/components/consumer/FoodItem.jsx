import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from "react";
import { StoreContext } from "../../pages/consumer/StoreContext";

const FoodItem = ({ id, name, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* <h2>{name}</h2>
        <div className="image-container">
        <img className="food-item-image" src={image} alt={name} />
        </div>
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.Add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.Remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.Remove_icon_green}
              alt="Add"
            />
          </div>
        )}
        <div className="price">$ {price}</div> */}
        <h2>{name}</h2>
        <div className="image-container">
          <img className="food-item-image" src={image} alt={name} />
        </div>
        <div className="flex">
        <div className="price">$ {price}</div>
        {!cartItems[id] ? (
          <FontAwesomeIcon
            icon="fa-solid fa-circle-plus"
            style={{ fontSize: "1.7rem", color: "black", marginBottom:"5px" }}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <FontAwesomeIcon
              icon="fa-solid fa-circle-minus"
              style={{ fontSize: "1.7rem", color: "red" }}
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <FontAwesomeIcon
              icon="fa-solid fa-circle-plus"
              style={{ fontSize: "1.7rem", color: "green" }}
              onClick={() => addToCart(id)}
            />
          </div>
        )}
        
        </div>
      </div>
    </div>
  );
};
export default FoodItem;
// export default function FoodItem() {
//   const FoodItem = (id, name, price, image) => {
//     const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
//     return (
//       <div className="food-item">
//         <div className="food-item-img-container">
//           <h1>{name}</h1>
//           <img className="food-item-image" src={image} alt="" />
//           {!cartItems[id] ? (
//             <img
//               className="add"
//               onClick={() => addToCart(id)}
//               src={Add_icon_white}
//               alt=""
//             />
//           ) : (
//             <div className="food-item-counter">
//               <img
//                 onClick={() => removeFromCart(id)}
//                 src={Remove_icon_red}
//                 alt=""
//               />
//               <p>{cartItems[id]}</p>
//               <img
//                 onClick={() => addToCart(id)}
//                 src={Remove_icon_green}
//                 alt=""
//               />
//             </div>
//           )}
//           <p>{price}</p>
//         </div>
//       </div>
//     );
//   };
// }
