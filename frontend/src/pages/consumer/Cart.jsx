import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";

const Cart = () => {
  const cartItems = useStore((state) => state.cartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getTotalCartAmount = useStore((state) => state.getTotalCartAmount);

  // const cartItems = useStore((state) => state.cartItems);
  // const foodList = useStore((state) => state.foodList);
  // const removeFromCart = useStore((state) => state.removeFromCart);
  // const getTotalCartAmount = useStore((state) => state.getTotalCartAmount);

  const navigate = useNavigate();

  console.log('Cart Items:', cartItems);
  //console.log('Food List:', foodList);

  return (
    <div className="cart">
      {/* Existing code */}
      <div className="cart-items">
        <div className="cart-item-title bold">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        <div>
        {cartItems.map((item, index) => (
            <div key={index}>
              <div className="cart-item-title cart-item-item">
                <img src={item.photo} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
                <p>{item.price * item.quantity}</p>
                <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/placeOrder")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
