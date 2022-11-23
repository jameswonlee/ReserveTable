import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from '../images/logo.png'
import profileButton from '../images/profile-button.png'
import aboveNav from '../images/above-nav.png'
import locationButton from '../images/location-button.png'
import upcomingReservations from '../images/upcoming-reservations-button.png'
import notifications from '../images/notifications.png'
import lineBreak from '../images/line-break.png'
import magnifyingGlass from '../images/search-button.png'
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
    </div>
  );
}

export default NavBar;
