import React from "react";
import { assets } from "../../assets/consumer/assets";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="Header-producer">
      <div className="header-content-producer">
        <div className="content">
          <h2>
            Organic Veggies,
            <br />
            Fresh Food
          </h2>
          <p>100% Organic Food Item at your one click!</p>
          <div className="search-bar">
            <input type="text" placeholder="Search here..." />
            <button>Search Now</button>
          </div>
        </div>
        <div className="carousel3">
          <Carousel>
            <Carousel.Item>
              <img src={assets.slider_1} alt="Image1"  />
              <Carousel.Caption>
                <h3>Fruits</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={assets.slider_2} alt="Image2"  />
              <Carousel.Caption>
                <h3>Vegetables</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src={assets.slider_3} alt="Image3"  />
              <Carousel.Caption>
                <h3>Salads</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
