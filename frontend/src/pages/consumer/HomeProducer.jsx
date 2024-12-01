import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/consumer/Header";
import { assets } from "../../assets/consumer/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../../components/main/ProductCard";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCopyright,
  faCarSide,
  faUserShield,
  faArrowRightArrowLeft,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import AutomatedSlider from "../../components/user/AutomatedSlider ";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";


const HomeProducer = () => {
  const addToCart = useStore((state) => state.addToCart);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);  // State for testimonials

  axios.defaults.withCredentials = true;

  // Fetch products data
  useEffect(() => {
    axios
      .get("https://grow-backend-pi.vercel.app/product/latest")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Fetch testimonials data
  useEffect(() => {
    axios
      .get("https://grow-backend-pi.vercel.app/testimonials/all") // Fetch testimonials
      .then((response) => {
        setTestimonials(response.data); // Store data in state
      })
      .catch((error) => {
        console.error("There was an error fetching the testimonials!", error);
      });
  }, []);

  return (
    <>
      <AutomatedSlider />
      <Header />
      <Link to="/smartbite" className="img_advise">
        <div className="img_advise"></div>
      </Link>

      <div className="about">
        <div className="abimg">
          <img src={assets.about} alt="about" />
        </div>
        <div className="about-content">
          <h3>-ORGANIC STORE-</h3>
          <h2>About us</h2>
          <p>
            We're committed to shrinking food miles by linking consumers and
            producers, strengthening local economies, and promoting
            sustainability. Through our platform, consumers access locally
            sourced goods directly from producers, fostering a deeper connection
            to food origins. By cutting out middlemen, we reduce environmental
            impact and support small-scale farmers. Join us in our mission to
            build a more resilient, community-driven food system for a healthier
            planet.
          </p>
          <button>Read More</button>
        </div>
      </div>

      <div className="bestseller-page">
        <h1>Recently Added Items</h1>
        <div className="products-grid">
          {products && products.length > 0 ? (
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

      {/* Testimonials Section */}
      <div className="carousel2">
        <h2>Testimonials</h2>
        <p>What others have to say about us!</p>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={3100}
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <div key={index}>
                <img
                  src={testimonial.photo || "default-photo.jpg"} // Use default if no photo available
                  alt={testimonial.name}
                />
                <div className="myCarousel">
                  <h3>{testimonial.name}</h3>
                  <h4>{testimonial.role}</h4> {/* Assuming role is in the response */}
                  <p>{testimonial.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No testimonials available.</p>
          )}
        </Carousel>
      </div>

      {/* Other sections like footer, features, etc. */}
    </>
  );
};

export default HomeProducer;
