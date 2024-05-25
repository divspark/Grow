import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/consumer/Header";
import { assets } from "../../assets/consumer/assets";
// import about from "../../assets/imgab.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../../components/main/ProductCard";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faCarSide, faUserShield, faArrowRightArrowLeft, faPhone } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import AutomatedSlider from "../../components/user/AutomatedSlider ";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";

const HomeProducer = () => {
  const addToCart = useStore((state) => state.addToCart);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  //const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch testimonials data from backend API
    axios.get("http://localhost:5000/api/v1/testimonials/all")
      .then(response => {
        // Set fetched testimonials data to state
        setTestimonials(response.data);
      })
      .catch(error => {
        //setError(error.message);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once on component mount


  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/product/latest") // Replace with your backend endpoint
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);



  return (
    <>
      {/* <Navbar/> */}
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
          <p>We're committed to shrinking food miles by linking consumers and producers, strengthening local economies, and promoting sustainability. Through our platform, consumers access locally sourced goods directly from producers, fostering a deeper connection to food origins. By cutting out middlemen, we reduce environmental impact and support small-scale farmers. Join us in our mission to build a more resilient, community-driven food system for a healthier planet.</p>
          <button>Read More</button>
        </div>
      </div>
      <div className="bestseller-page">
        <h1>Recently Added Items</h1>
        <div className="products-grid">
          {products && products.length > 0 ? (
            products.map(product => (
              <ProductCard
                key={product.id}
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

      <div className="features">
        <div className="feature-box">
          <FontAwesomeIcon icon={faCarSide} className="icon" />
          <h4>Free Shipping</h4>
          <p>Free on order above $200</p>
        </div>
        <div className="feature-box">
          <FontAwesomeIcon icon={faUserShield} className="icon" />
          <h4>Security Payment</h4>
          <p>100% Security Payment</p>
        </div>
        <div className="feature-box">
          <FontAwesomeIcon icon={faArrowRightArrowLeft} className="icon" />
          <h4>Easy Exchange</h4>
          <p>Easy 15 day money guarantee</p>
        </div>
        <div className="feature-box">
          <FontAwesomeIcon icon={faPhone} className="icon" />
          <h4>24/7 Support</h4>
          <p>Support at your one call</p>
        </div>
      </div>

      <div className="carousel2">
      <h2>Testimonials</h2>
      <p>What others have to say about us!</p>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index}>
            <img src={testimonial.photo || `http://localhost:5000/${testimonial.photo}`} alt={testimonial.name} />
            <div className="myCarousel">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.message}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>

      {/* <div className="carousel2">
        <h2>Testimonials</h2>
        <p>What others have to say about us!</p>
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={6100}
        >
          <div>
            <img src={assets.shirley} alt="shirley" />
            <div className="myCarousel">
              <h3>Shirley Fultz</h3>
              <h4>Designer</h4>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit beatae amet autem vero commodi facere, tempore expedita!</p>
            </div>
          </div>

          <div>
            <img src={assets.daniel} alt="daniel" />
            <div className="myCarousel">
              <h3>Daniel Keystone</h3>
              <h4>Designer</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ipsam omnis eveniet soluta non doloremque aut, molestiae!</p>
            </div>
          </div>

          <div>
            <img src={assets.theo} alt="theo" />
            <div className="myCarousel">
              <h3>Theo Sorel</h3>
              <h4>Designer</h4>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, voluptatum culpa. Corrupti impedit iusto, in quis enim eos!</p>
            </div>
          </div>
        </Carousel>
      </div> */}

      <div className="footer">
        <div className="sb__footer section__padding">
          <div className="sb__footer-links">
            <div className="sb__footerlink_div1">
              <h3>Why People like Us!</h3>
              <p>typesetting, remaining essentially unchanged. It was popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
            </div>
            <div className="sb__footerlink_div">
              <h3>Shop Info</h3>
              <a href="/about"><p>About</p></a>
              <a href="/contact"><p>Contact</p></a>
              <a href="/privacy"><p>Privacy Policy</p></a>
              <a href="/Terms"><p>Terms & Conditions</p></a>
              <a href="/faq"><p>FAQ's & Questions</p></a>
            </div>
            <div className="sb__footerlink_div">
              <h3>Account</h3>
              <a href="/account"><p>My Account</p></a>
              <a href="/shopdetails"><p>Shop Details</p></a>
              <a href="/cart"><p>Shopping Cart</p></a>
              <a href="/Wishlist"><p>Wishlist</p></a>
              <a href="/Order history"><p>Order History</p></a>
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
          <hr></hr>
          <div className="sb__footer-below">
            <div className="sb__footer-copyright">
              <p>
                <FontAwesomeIcon icon={faCopyright} /> 2024.Food_miles.All
                right reserved.
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
