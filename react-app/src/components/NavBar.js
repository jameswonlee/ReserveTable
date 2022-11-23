import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from '../images/logo.png'
import profileButton from '../images/profile-button.png'
import './NavBar.css'

const NavBar = () => {
  return (
    <>
      <div className="above-nav">
          
      </div>
      <div className="nav-bar">
        <div>
          <NavLink to="/" exact={true} className="nav-link">
            <img src={logo} className="logo"></img>
          </NavLink>
        </div>
        <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <img src={profileButton} className="profile-button"></img>
          </NavLink>
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
    </>
  );
}

export default NavBar;
