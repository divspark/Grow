// src/pages/consumer/PlaceOrder.jsx
import React, { useState } from "react";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const PlaceOrder = () => {
  const getTotalCartAmount = useStore((state) => state.getTotalCartAmount);
  //const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); // State to store email
  const [street, setStreet] = useState(''); // State to store street
  const [city, setCity] = useState(''); // State to store city
  const [state, setState] = useState(''); // State to store state
  const [postalCode, setPostalCode] = useState(''); // State to store postal code
  const [country, setCountry] = useState(''); // State to store country
  const cartItems = useStore((state) => state.cartItems); // Get cart items from the store

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      //setLoading(true); // Set loading state to true
      // const response = await axios.post('http://localhost:5000/api/v1/order/new', {
      //   user:  email , // Send email in user object
      //   products: cartItems, // Send cart items to the backend
      //   shippingAddress: {
      //     street,
      //     city,
      //     state,
      //     postalCode,
      //     country
      //   },
      //   status: 'pending',
      //   totalAmount: getTotalCartAmount() // Send total amount to the backend
      // });
      // const config = {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      //   }
      // };
      const response = await axios.post('https://grow-backend-pi.vercel.app/order/new', {
        user:  email , // Send email in user object
        products: cartItems, // Send cart items to the backend
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
          country
        },
        status: 'pending',
        totalAmount: getTotalCartAmount() // Send total amount to the backend
      });
      console.log('Order placed:', response.data);
      //setLoading(false); // Set loading state to false after successful order placement
      navigate('/payment'); // Navigate to the payment page
    } catch (error) {
      console.error('Error placing order:', error);
      //setLoading(false); // Set loading state to false in case of error
    }
  };


  return (
    <form className="place-order" onSubmit={handlePlaceOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
        <div className="multi-fields">
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Zip code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/payment")}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
