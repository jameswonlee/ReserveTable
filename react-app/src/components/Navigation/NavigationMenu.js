import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from '../_auth/LoginForm';
import SignUpForm from '../_auth/SignUpForm';
import profileButton from '../../icons/profile-button.ico';
import upcomingReservations from '../../icons/upcoming-reservations-icon.ico';
import notifications from '../../icons/notification-icon.ico';
import lineBreak from '../../icons/line-break.png';
import magnifyingGlass from '../../icons/search-button.ico';
import ProfileButtonMenu from './ProfileButtonMenu';
import UpcomingReservationsMenu from '../Reservations/UpcomingReservationsMenu';
import upcomingReservationsNotification from '../../icons/upcoming-reservation-w-notification.ico';
import './NavigationMenu.css'
import { getAllUserReservations } from '../../store/reservations';


function NavigationMenu() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);

    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showReservationsMenu, setShowReservationsMenu] = useState(false);


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

    const openReservationsMenu = () => {
        setShowReservationsMenu(true);
    }

    const closeReservationsMenu = () => {
        setShowReservationsMenu(false);
    }

    useEffect(() => {
        if (!showMenu) return;
        document.addEventListener('click', closeMenu);
        setShowSignInModal(false);
        setShowSignUpModal(false);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    
    useEffect(() => {
        if (!showReservationsMenu) return;
        
        document.addEventListener('click', closeReservationsMenu);
        return () => document.removeEventListener('click', closeReservationsMenu);
    }, [showReservationsMenu]);
    
    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser?.id));
    }, [sessionUser])
    


    return (
        <div className="navigation-menu">
            {
                sessionUser
                    ?
                    <div className="nav-bar-menu-items">
                        <button className="profile-button" onClick={openMenu}>
                            <img src={profileButton} className="profile-button-icon" />
                            {showMenu && (
                                <ProfileButtonMenu setShowSignInModal={setShowSignInModal} />
                            )}
                        </button>
                        <button className="upcoming-reservations-menu-button" onClick={openReservationsMenu}>
                            {reservations
                                ?
                                <img src={upcomingReservationsNotification} className="upcoming-reservations-notification-icon" />
                                :
                                <img src={upcomingReservations} className="upcoming-reservations-icon" />
                            }
                            {showReservationsMenu && (
                                <UpcomingReservationsMenu />
                            )}
                        </button>
                        <img src={notifications} className="notifications-icon" />
                        <img src={lineBreak} className="line-break" />
                        <img src={magnifyingGlass} className="logged-in-search-button" />
                    </div>
                    :
                    <div className="sign-in-menu-items">
                        <button className="sign-up-button" onClick={openSignUp}>
                            Sign up
                            {showSignUpModal && (
                                <Modal onClose={() => setShowSignUpModal(false)}>
                                    <SignUpForm />
                                </Modal>
                            )}
                        </button>
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
        </div>
    )
}


export default NavigationMenu;