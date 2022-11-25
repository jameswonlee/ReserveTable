import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = ({ setShowSignInModal }) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    // Is this necessary??? If not - delete
    await setShowSignInModal(false);
  };

  return <button className="profile-button logout" onClick={onLogout}>Sign out</button>;
};

export default LogoutButton;
