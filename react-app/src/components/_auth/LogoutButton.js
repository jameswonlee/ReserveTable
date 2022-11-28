import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css'

const LogoutButton = ({ setShowSignInModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    // Is this necessary??? If not - delete
    // await setShowSignInModal(false);
    history.push('/')
  };

  return <button className="profile-drop-logout-button" onClick={onLogout}>Sign out</button>;
};

export default LogoutButton;
