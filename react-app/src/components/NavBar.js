import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import logo from '../images/logo.png'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" className="nav-link">
            <img src={logo} className="logo" width="200px;" height="40px;">
            </img>
          </NavLink>
        </li>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>

    </nav>
  );
}

export default NavBar;
