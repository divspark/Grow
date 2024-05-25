import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../../components/main/Header';
import ProductCard from '../../components/main/ProductCard';
import data from '../../assets/data.json';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // let menuItems = [
  //   {
  //     text: 'Options',
  //     items: [
  //       { text: 'Only Audio' },
  //       { text: 'Basic' }
  //     ]
  //   }
  // ];

  const handleAddMore = () => {
    // Navigate to the desired route when "Add More" button is clicked
    navigate('/producer/additems'); // Replace '/add-more' with the desired route path
  };

  return (
    <>
      <Header />
      <div className="Home_container">
        <div className="heading">
          <h1>Grow ! Introducing our revolutionary platform, where sustainability meets convenience! 🌱 Welcome to the forefront of eco-conscious consumption, where we're not just reducing food miles and waste, but revolutionizing the way you shop and eat!🍽️</h1>
        </div>

        <section className='items'>
          <div className="items-header">
            <h1>Recently Added</h1>
            <button className="add-more-btn" onClick={handleAddMore}>Add More</button> {/* Call handleAddMore function on button click */}
          </div>
          <div className="products">
            { 
              data.products.map(product => (
                <ProductCard
                  key={product.id} // Use product.id as the key
                  productId={product.id}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  photo={product.photo}
                  handler={() => {}} />
              ))
            }
          </div>
        </section>
        <footer className="footer">
          <p>© 2024 Your Company. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
