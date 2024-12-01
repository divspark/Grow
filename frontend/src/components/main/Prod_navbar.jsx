import React from 'react';
import { GiFarmTractor } from 'react-icons/gi';

const Prod_navbar = () => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#dfff8d',
    borderBottom: '1px solid #e7e7e7',
  };

  const logoStyle = {
    color: 'aliceblue',
    fontSize: '30px',
    fontWeight: 'bold',
    //give left padding
    paddingLeft: '10px',
  };

  const menuStyle = {
    display: 'flex',
    gap: '15px',
  };

  const itemStyle = {
    color: 'aliceblue',
    textDecoration: 'none',
    fontSize: '22px',
    fontWeight: 'bold',
  };

  return (
    <nav style={navbarStyle}>
      <div className="navbar__logo_prod" style={logoStyle}>
        <GiFarmTractor />
      </div>
      <div className="navbar__menu_prod" style={menuStyle}>
        <a href="/producer/additems" className="navbar__item_prod" style={itemStyle}>
          Add Items
        </a>
        <a href="/signup" className="navbar__item_prod" style={itemStyle}>
          Sign Up/Log in
        </a>
      </div>
    </nav>
  );
};

export default Prod_navbar;
