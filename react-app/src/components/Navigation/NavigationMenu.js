import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal';
import { getAllUserReservations } from '../../store/reservations';
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
import dayjs from 'dayjs';
import './NavigationMenu.css'


function NavigationMenu({ showSignInModal, setShowSignInModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allReservations = useSelector(state => Object.values(state.reservations));
    const futureReservations = allReservations.filter(reservation => dayjs().isBefore(reservation.reservation_time));

    // const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showReservationsMenu, setShowReservationsMenu] = useState(false);

    const openSignIn = () => {
        if (showSignInModal) return;
        setShowSignInModal(true)
    }

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
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        if (!showReservationsMenu) return;
        document.addEventListener('click', closeReservationsMenu);
        return () => document.removeEventListener('click', closeReservationsMenu);
    }, [showReservationsMenu]);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllUserReservations(sessionUser.id));
        }
    }, [dispatch, sessionUser])



    return (
        <div className="navigation-menu">
            {
                sessionUser
                    ?
                    <div className="nav-bar-menu-items">
                        <button className="profile-button" onClick={openMenu}>
                            <img src={profileButton} className="profile-button-icon" alt="" />
                        </button>
                        {showMenu && (
                            <ProfileButtonMenu setShowSignInModal={setShowSignInModal} />
                        )}
                        <button className="upcoming-reservations-menu-button" onClick={openReservationsMenu}>
                            {futureReservations.length > 0
                                ?
                                <img src={upcomingReservationsNotification} alt="" className="upcoming-reservations-notification-icon" />
                                :
                                <img src={upcomingReservations} alt="" className="upcoming-reservations-icon" />
                            }
                        </button>
                        {showReservationsMenu && (
                            <UpcomingReservationsMenu />
                        )}
                        <img src={notifications} className="notifications-icon" alt="" />
                        <img src={lineBreak} className="line-break" alt="" />
                        <img src={magnifyingGlass} className="logged-in-search-button" alt="" />
                    </div>
                    :
                    <div className="sign-in-menu-items">
                        <button className="sign-up-button" onClick={openSignUp}>
                            Sign up
                            {showSignUpModal && (
                                <Modal onClose={() => setShowSignUpModal(false)}>
                                    <SignUpForm setShowSignUpModal={setShowSignUpModal} />
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
                            <img src={magnifyingGlass} className="logged-out-search-button" alt="" />
                        </div>
                    </div>
            }
        </div>
    )
}


export default NavigationMenu;