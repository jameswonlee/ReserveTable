import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationMenu from './NavigationMenu'
import logo from '../../icons/logo.png';
import locationIcon from '../../icons/location-icon.ico';
import downCarrot from '../../icons/down-caret.ico';
import aboveNavDownCaret from '../../icons/nav-bar-down-caret.ico';
import './NavBar.css';


const NavBar = ({ loaded, showSignInModal, setShowSignInModal }) => {

  return (
    <nav className="navigation">
      <div className="above-nav">
        <div className="above-nav-for-businesses">For Businesses</div>
        <div className="above-nav-mobile"><span>Mobile<span><img src={aboveNavDownCaret} className="above-nav-down-caret"/></span></span></div>
        <div className="above-nav-faqs">FAQs</div>
        <div className="above-nav-en"><span>EN<span><img src={aboveNavDownCaret} className="above-nav-down-caret"/></span></span></div>
      </div>
      <div className="nav-bar">
        <div className="nav-bar-logo-location-container">
          <div className="nav-bar-logo">
            <NavLink to="/" exact={true} className="nav-link">
              <img src={logo} className="logo" alt="" />
            </NavLink>
          </div>
          <div>
            <img src={locationIcon} className="location-icon" alt="" />
          </div>
          <div className="nav-bar-location-city-text">
            Los Angeles
          </div>
          <div>
            <img src={downCarrot} className="down-carrot-icon" alt="" />
          </div>
        </div>
        {loaded &&
          <NavigationMenu showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />}
      </div>
    </nav>
  );
}

export default NavBar;



