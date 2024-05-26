import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/consumer/Home"
import Product from './pages/consumer/Product';
import Cart from './pages/consumer/Cart';
import Checkout from "./pages/consumer/Checkout"
import MyItems from './pages/producer/MyItems';
import BasicInput from './components/Features/BasicInput.jsx';
import HomeProducer from './pages/consumer/HomeProducer.jsx'
import Navbar from './components/consumer/Navbar';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup.jsx'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Payment from './pages/consumer/Payment.jsx';
import PlaceOrder from "./pages/consumer/PlaceOrder.jsx";
import SmartBite from './pages/consumer/SmartBite.jsx';
import SpeechRecogination from './components/Features/SpeechRecogination.jsx';
import AddItem from './pages/producer/AddItem.jsx';
import Search from './pages/consumer/Search.jsx';
import FeedbackForm from './pages/consumer/FeedbackForm.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Products from './pages/admin/Products.jsx';
// import Customers from './pages/admin/customers.jsx';
import Customer from './pages/admin/Customer.jsx';
import Transaction from './pages/admin/Transaction.jsx';
//import UploadImage from './components/Features/CameraRecogination.jsx';


library.add(fas, faTwitter, faFontAwesome)

const App = () => {
  return (

    <Router>

        <Navbar />
        
          <Routes>

            {/*Producer*/}
            <Route exact path="/producer/:id" element={<Home />} />
            <Route path="/producer/:id/product" element={<Product />} />
            <Route path="/producer/:id/cart" element={<Cart />} />
            <Route path="/producer/:id/checkout" element={<Checkout />} />
            <Route path="/producer/additems" element={<AddItem />} />

            {/*Consumer*/}
            <Route exact path="/" element={<HomeProducer />} />
            <Route path="/myitems" element={<MyItems />} />
            <Route path="/addItems" element={<BasicInput />} />
            <Route path="/products" element={<Product />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/placeOrder" element={<PlaceOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path='/smartbite' element={<SmartBite />} />
            <Route path='/search' element={<Search />} />
            <Route path='/contact' element={<FeedbackForm />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/speech" element={<SpeechRecogination />} />
            {/* <Route path="/image" element={<UploadImage />} /> */}



            {/* Admin */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/customers" element={<Customer />} />
            <Route path="/admin/transaction" element={<Transaction />} />
          </Routes>
    </Router>

  );
};

export default App;
