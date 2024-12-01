import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFontAwesome, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ConditionalNavbar from './components/consumer/ConditionalNavbar.jsx';
//import Dashboard from './pages/admin/Dashboard.jsx';
//import Transaction from './pages/admin/Transaction.jsx';
//import Customers from './pages/admin/Customers.jsx';
//import Customer from './pages/admin/Customer.jsx';
//import Products from './pages/admin/Products.jsx';
import { Loader, Center } from '@mantine/core';


library.add(fas, faTwitter, faFontAwesome);

// Lazy load components
const Home = lazy(() => import('./pages/consumer/Home'));
const Product = lazy(() => import('./pages/consumer/Product'));
const Cart = lazy(() => import('./pages/consumer/Cart'));
const Checkout = lazy(() => import('./pages/consumer/Checkout'));
const MyItems = lazy(() => import('./pages/producer/MyItems'));
const BasicInput = lazy(() => import('./components/Features/BasicInput.jsx'));
const HomeProducer = lazy(() => import('./pages/consumer/HomeProducer.jsx'));
const Login = lazy(() => import('./pages/admin/Login'));
const Signup = lazy(() => import('./pages/admin/Signup.jsx'));
const Payment = lazy(() => import('./pages/consumer/Payment.jsx'));
const PlaceOrder = lazy(() => import('./pages/consumer/PlaceOrder.jsx'));
const SmartBite = lazy(() => import('./pages/consumer/SmartBite.jsx'));
const SpeechRecogination = lazy(() => import('./components/Features/SpeechRecogination.jsx'));
const AddItem = lazy(() => import('./pages/producer/AddItem.jsx'));
const Search = lazy(() => import('./pages/consumer/Search.jsx'));
 //const FeedbackForm = lazy(() => import('./pages/consumer/FeedbackForm.jsx'));
 const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const Products = lazy(() => import('./pages/admin/Products.jsx'));
 //const Customers = lazy(() => import('./pages/admin/customers.jsx'));
const Customer = lazy(() => import('./pages/admin/Customer.jsx'));
const Transaction = lazy(() => import('./pages/admin/Transaction.jsx'));
//const ContactUs = lazy(() => import('./pages/consumer/Contact.jsx'));
// const UploadImage = lazy(() => import('./components/Features/CameraRecogination.jsx'));
const AiwithText = lazy(() => import('./components/Features/AiwithText.jsx'));
const FeedbackForm = lazy(() => import('./pages/consumer/FeedbackForm.jsx'));

const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <Suspense
        fallback={
          <Center style={{ height: '100vh' }}>
            <Loader size="xl" color="blue" variant="dots" />
          </Center>
        }
      >
        <Routes>
          {/* Producer */}
          <Route exact path="/producer" element={<Home />} />
          <Route path="/producer/product" element={<Product />} />
          <Route path="/producer/cart" element={<Cart />} />
          <Route path="/producer/checkout" element={<Checkout />} />
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
          <Route path='/contact' element={<FeedbackForm />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/speech" element={<SpeechRecogination />} />
          <Route path="/aiwithtext" element={<AiwithText />} />
          {/* <Route path="/image" element={<UploadImage />} /> */}


          {/* Admin */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/customers" element={<Customer />} />
          <Route path="/admin/transaction" element={<Transaction />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
