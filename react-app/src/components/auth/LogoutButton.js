import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './Auth.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    // e.stopPropagation();
    await dispatch(logout());
  };

  return <button className="profile-button logout" onClick={onLogout}>Sign out</button>;
};

export default LogoutButton;
