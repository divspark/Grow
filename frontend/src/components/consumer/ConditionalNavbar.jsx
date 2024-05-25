import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
  const location = useLocation();
  
  // Determine if the current route is a producer route
  const isProducerRoute = location.pathname.startsWith('/producer');

  // Conditionally render the Navbar
  return !isProducerRoute ? <Navbar /> : null;
};

export default ConditionalNavbar;
