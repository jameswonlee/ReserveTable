import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationMenu from './NavigationMenu'

import logo from '../../icons/logo.png';
import aboveNav from '../../icons/above-nav.png';
import locationButton from '../../icons/location-button-la.ico';
import locationLineBreak from '../../icons/location-line-break.png';
import navCity from '../../icons/home-us-la.png';
import './NavBar.css';


const NavBar = ({ loaded }) => {

  return (
    <div className="navigation">
      <div className="above-nav">
        <img src={aboveNav} className="above-nav-img" alt="" ></img>
      </div>
      <div className="nav-bar">
        <div>
          <NavLink to="/" exact={true} className="nav-link">
            <img src={logo} className="logo" alt="" />
          </NavLink>
          <img src={locationLineBreak} className="location-line-break" alt=""/>
          <img src={locationButton} className="location-button" alt=""/>
        </div>
        {loaded &&
          <NavigationMenu />}
      </div>
      <div className="under-nav">
        <img src={navCity} className="under-nav-image" alt=""/>
      </div>
    </div>
  );
}

export default NavBar;



