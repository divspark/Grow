import { useNavigate } from 'react-router-dom';
// import React from 'react'
//import { assets } from '../../assets/consumer/assets'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { GiFarmTractor } from "react-icons/gi";
import { FaCartPlus, FaSearch } from 'react-icons/fa';
const Navbar = () => {
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate();
  return (
    

    <div className="Navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>
                <GiFarmTractor />
        </div>
      <ul className="navbar-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}}to='/'>Home</Link> {menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Products")}}><Link style={{textDecoration: 'none'}}to='/products'>Products</Link> {menu==="Products"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Smart Bite")}}><Link style={{textDecoration: 'none'}}to='/smartbite'>Smart Bite</Link></li>
            <li onClick={()=>{setMenu("contact-us")}}><Link style={{textDecoration: 'none'}}to='/contact'>Contacts</Link> {menu==="contact-us"?<hr/>:<></>}</li>
        </ul>
        <div className="navbar-right">
            <div className="searchicon">
              <Link to='/search'><FaSearch /></Link>
              </div>
            
            <div className="navbarcarticon">
                <Link to='/Cart'><FaCartPlus /></Link>
                
                {/* <div className="navbarcarticon-count">2</div> */}
            </div>
            <div className="btn">
              <Link to='/login'><button>Sign Up</button></Link></div>
            
        </div>
    </div>

    
  )
}
export default Navbar