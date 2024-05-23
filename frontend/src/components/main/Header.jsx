import React from 'react';
import { GiFarmTractor } from 'react-icons/gi';
import centerImage from '../../assets/black_white_grow_logo-removebg-preview.png';

const Header = () => {

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <GiFarmTractor />
            </div>
            <div className="navbar__menu">
                <a href="/producer/additems" className="navbar__item">
                    My Items
                </a>
                <a href="/signup" className="navbar__item">
                    Sign Up
                </a>
            </div>
                <img src={centerImage} alt="Center" className="navbar__center-image" />  
        </nav>
    );
};

export default Header;
