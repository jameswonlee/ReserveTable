import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { resetReservations } from '../../store/reservations';
import { resetReviews } from '../../store/reviews';
import './LogoutButton.css'
import { resetSavedRestaurants } from '../../store/savedRestaurants';

const LogoutButton = ({ setShowSignInModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    dispatch(resetReservations());
    dispatch(resetReviews());
    dispatch(resetSavedRestaurants());
    await dispatch(logout());
    history.push('/')
  };

  return (
      <div className="profile-drop-logout-button" onClick={onLogout}>
        Sign out
      </div>
  )
};

export default LogoutButton;
