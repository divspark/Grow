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

import AutomatedSlider from "../../components/user/AutomatedSlider";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import { Loader } from "@mantine/core"; // Importing the Loader component

const HomeProducer = () => {
  const addToCart = useStore((state) => state.addToCart);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]); // State for testimonials
  const [loadingTestimonials, setLoadingTestimonials] = useState(true); // Track loading state for testimonials

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
        setLoadingTestimonials(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the testimonials!", error);
        setLoadingTestimonials(false); // Set loading to false even if there's an error
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
        
        {/* Show Loader if testimonials are still being fetched */}
        {loadingTestimonials ? (
          <Loader variant="bars" size="lg" />
        ) : (
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
                    src={"default-photo.jpg"} // Use default if no photo available
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
        )}
      </div>

      <div className="footer">
        <div className="sb__footer section__padding">
          <div className="sb__footer-links">
            <div className="sb__footerlink_div1">
              <h3>Why People like Us!</h3>
              <p>
                People like us because we connect local producers with
                consumers, ensuring fresh, high-quality fruits and vegetables.
                Our marketplace fosters community support and sustainable
                practices, making every purchase meaningful.
              </p>
            </div>
            <div className="sb__footerlink_div">
              <h3>Shop Info</h3>
              <a href="/about">
                <p>About</p>
              </a>
              <a href="/contact">
                <p>Contact</p>
              </a>
              <a href="/privacy">
                <p>Privacy Policy</p>
              </a>
              <a href="/Terms">
                <p>Terms & Conditions</p>
              </a>
              <a href="/faq">
                <p>FAQ's & Questions</p>
              </a>
            </div>
            <div className="sb__footerlink_div">
              <h3>Account</h3>
              <a href="/account">
                <p>My Account</p>
              </a>
              <a href="/shopdetails">
                <p>Shop Details</p>
              </a>
              <a href="/cart">
                <p>Shopping Cart</p>
              </a>
              <a href="/Wishlist">
                <p>Wishlist</p>
              </a>
              <a href="/Order history">
                <p>Order History</p>
              </a>
            </div>
            <div className="sb__footerlink_div">
              <h3>Contact</h3>
              <p>Address: 1429 Netus Rd, NY 48247</p>
              <p>Email: Example@gmail.com</p>
              <p>Phone: +0123 4567 8910</p>
              <p>Payment Accepted</p>
              <img src={assets.payments} alt="payment" />
            </div>
          </div>
          <hr />
          <div className="sb__footer-below">
            <div className="sb__footer-copyright">
              <p>
                <FontAwesomeIcon icon={faCopyright} /> 2024.Food_miles.All right
                reserved.
              </p>
            </div>
            <div className="sb__footer-social">
              <h3>Follow us on:</h3>
              <div className="social_media">
                <p>
                  <FontAwesomeIcon icon={faFacebook} />
                </p>
                <p>
                  <FontAwesomeIcon icon={faTwitter} />
                </p>
                <p>
                  <FontAwesomeIcon icon={faInstagram} />
                </p>
                <p>
                  <FontAwesomeIcon icon={faLinkedin} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeProducer;
