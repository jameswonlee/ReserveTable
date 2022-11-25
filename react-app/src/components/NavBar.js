import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from '../icons/logo.png'
import profileButton from '../icons/profile-button.ico'
import aboveNav from '../icons/above-nav.png'
import locationButton from '../icons/location-button-la.ico'
import upcomingReservations from '../icons/upcoming-reservations-button.ico'
import notifications from '../icons/notifications.ico'
import lineBreak from '../icons/line-break.png'
import magnifyingGlass from '../icons/search-button.ico'
import locationLineBreak from '../icons/location-line-break.png'
import navCity from '../icons/home-us-la.png'
import './NavBar.css'

const NavBar = () => {
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
        <div className="nav-bar-menu-items">
          <NavLink to='/login' exact={true} activeClassName='active'>
            <img src={profileButton} className="profile-button" />
          </NavLink>
            <img src={upcomingReservations} className="upcoming-reservations-button" />
            <img src={notifications} className="notifications-button" />
            <img src={lineBreak} className="line-break" />
            <img src={magnifyingGlass} className="search-button" />
          {/* <div>
          <LogoutButton />
        </div> */}
        </div>
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
      </div>
      <div className="under-nav">
        <img src={navCity} className="under-nav-image"/>
      </div>
    </div>
  );
}

export default NavBar;
