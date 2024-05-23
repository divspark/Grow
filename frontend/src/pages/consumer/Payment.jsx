import React from "react";
import { assets } from "../../assets/consumer/assets";
const Payment = () => {
  return (
    <div className="container">
      <form action="post">
        <div className="row">
          <div className="col">
            <h3 className="title">Billing address</h3>
            <div className="inputBox">
              <span>Full name:</span>
              <input type="text" placeholder="shital"></input>
            </div>
            <div className="inputBox">
              <span>Email:</span>
              <input type="email" placeholder="example@example.come"></input>
            </div>
            <div className="inputBox">
              <span>Address:</span>
              <input type="text" placeholder="room-street-location"></input>
            </div>
            <div className="inputBox">
              <span>City:</span>
              <input type="text" placeholder="Lucknow"></input>
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>State:</span>
                <input type="text" placeholder="India"></input>
              </div>
              <div className="inputBox">
                <span>Zip code:</span>
                <input type="text" placeholder="shital"></input>
              </div>
            </div>
            
            <h3 className="title">Payment</h3>
            <div className="inputBox">
              <span>Cards accepted:</span>
              <img src={assets.accepted_card} alt="" />
              <input type="email" placeholder="example@example.come"></input>
            </div>
            <div className="inputBox">
            <span>Name on card:</span>
            <input type="text" placeholder=" Miss. Shital"></input>
            </div>
          

          <div className="inputBox">
            <span>Credit card number:</span>
            <input type="text" placeholder="1111-2222-3333-4444"></input>
          </div>
          <div className="inputBox">
            <span>Exp month:</span>
            <input type="text" placeholder="January"></input>
          </div>
          
            <div className="inputBox">
              <span>Exp year:</span>
              <input type="text" placeholder="2024"></input>
            </div>
            <div className="inputBox">
              <span>CVV:</span>
              <input type="text" placeholder="1234"></input>
            </div>
          
          </div>
          <input
            type="submit"
            value="Proceed To Checkout"
            className="submit-btn"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default Payment;
