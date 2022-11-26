import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import LogoutButton from '../auth/LogoutButton';

import profileButton from '../../icons/profile-button.ico';
import upcomingReservations from '../../icons/upcoming-reservations-button.ico';
import notifications from '../../icons/notifications.ico';
import lineBreak from '../../icons/line-break.png';
import magnifyingGlass from '../../icons/search-button.ico';
import ProfileButtonMenu from './ProfileButtonMenu';

import './NavigationMenu.css'


function NavigationMenu() {
    const sessionUser = useSelector(state => state.session.user);

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);


    const openSignIn = () => {
        if (showSignInModal) return;
        setShowSignInModal(true)
    }
    // console.log(showSignInModal)

    const openSignUp = () => {
        if (showSignUpModal) return;
        setShowSignUpModal(true)
    }

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    return (
        <div className="navigation-menu">
            {
                sessionUser
                    ?
                    <div className="nav-bar-menu-items">
                        <button className="profile-button" onClick={openMenu}>
                            <img src={profileButton} className="profile-button-icon" />
                        </button>

                        <img src={upcomingReservations} className="upcoming-reservations-button" />
                        <img src={notifications} className="notifications-button" />
                        <img src={lineBreak} className="line-break" />
                        <img src={magnifyingGlass} className="logged-in-search-button" />
                    </div>
                    :
                    <div className="sign-in-menu-items">
                        {/* <div className="sign-up-button-container"> */}
                            <button className="sign-up-button" onClick={openSignUp}>
                                Sign up
                                {showSignUpModal && (
                                    <Modal onClose={() => setShowSignUpModal(false)}>
                                        <SignUpForm />
                                    </Modal>
                                )}
                            </button>
                        {/* </div> */}
                        <div>
                            <button className="sign-in-button" onClick={openSignIn}>
                                Sign in
                                {showSignInModal && (
                                    <Modal onClose={() => setShowSignInModal(false)}>
                                        <LoginForm setShowSignInModal={setShowSignInModal} />
                                    </Modal>
                                )}
                            </button>
                        </div>
                        <div>
                            <img src={magnifyingGlass} className="logged-out-search-button" />
                        </div>

                    </div>
            }
            {showMenu &&
                <ProfileButtonMenu setShowSignInModal={setShowSignInModal} />
            }
        </div>
    )
}


export default NavigationMenu;