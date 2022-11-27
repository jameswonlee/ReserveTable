import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavigationMenu from './NavigationMenu'

import logo from '../../icons/logo.png';
import aboveNav from '../../icons/above-nav.png';
import locationButton from '../../icons/location-button-la.ico';
import locationLineBreak from '../../icons/location-line-break.png';
import navCity from '../../icons/home-us-la.png';
import './NavBar.css';
import LogoutButton from '../_auth/LogoutButton';


const NavBar = ({ loaded }) => {

  return (
    <div className="navigation">
      <div className="above-nav">
        <img src={aboveNav} className="above-nav-img"></img>
      </div>
      <div className="nav-bar">
        <div>
          <NavLink to="/" exact={true} className="nav-link">
            <img src={logo} className="logo"></img>
          </NavLink>
          <img src={locationLineBreak} className="location-line-break" />
          <img src={locationButton} className="location-button" />
        </div>
        {loaded &&
          <NavigationMenu />}
      </div>
      <div className="under-nav">
        <img src={navCity} className="under-nav-image" />
      </div>
    </div>
  );
}

export default NavBar;


{/* <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div> */}
