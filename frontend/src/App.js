import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/consumer/Home";
import Product from './pages/consumer/Product';
import Cart from './pages/consumer/Cart';
import Checkout from "./pages/consumer/Checkout";
import MyItems from './pages/producer/MyItems';
import BasicInput from './components/Features/BasicInput.jsx';
import HomeProducer from './pages/consumer/HomeProducer.jsx';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup.jsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Payment from './pages/consumer/Payment.jsx';
import PlaceOrder from "./pages/consumer/PlaceOrder.jsx";
import SmartBite from './pages/consumer/SmartBite.jsx';
import SpeechRecogination from './components/Features/SpeechRecogination.jsx';
import AddItem from './pages/producer/AddItem.jsx';
import Search from './pages/consumer/Search.jsx';
//import FeedbackForm from './pages/consumer/FeedbackForm.jsx';
import { ContactUs } from './pages/consumer/Contact.jsx';
//import UploadImage from './components/Features/CameraRecogination.jsx';
import ConditionalNavbar from './components/consumer/ConditionalNavbar.jsx';

library.add(fas, faTwitter, faFontAwesome);

const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        {/* Producer */}
        <Route exact path="/producer/:id" element={<Home />} />
        <Route path="/producer/:id/product" element={<Product />} />
        <Route path="/producer/:id/cart" element={<Cart />} />
        <Route path="/producer/:id/checkout" element={<Checkout />} />
        <Route path="/producer/additems" element={<AddItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/speech" element={<SpeechRecogination />} />

        {/* Consumer */}
        <Route exact path="/" element={<HomeProducer />} />
        <Route path="/myitems" element={<MyItems />} />
        <Route path="/addItems" element={<BasicInput />} />
        <Route path="/products" element={<Product />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path='/smartbite' element={<SmartBite />} />
        <Route path='/search' element={<Search />} />
        <Route path='/contact' element={<ContactUs />} />
        
        {/* <Route path="/image" element={<UploadImage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
