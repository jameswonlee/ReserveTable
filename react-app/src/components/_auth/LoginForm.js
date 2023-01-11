import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = ({ setShowSignInModal }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState('');
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!email) errors.push("Please enter your email address");
    if (!password) errors.push("Please enter your password");

    setValidationErrors(errors);

    if (!errors.length) {
      const data = await dispatch(login(email, password));
      if (data) {
        const backendErrors = [];
        data.forEach(error => {
          let arr = error.split(': ');
          backendErrors.push(arr[1])
        })
        setErrors(backendErrors);
      } else {
        setShowSignInModal(false);
      }
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
    setShowSignInModal(false);
  }

  const updateEmail = (e) => {
    setValidationErrors([]);
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setValidationErrors([]);
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/' />;
  // }

  return (
    <form onSubmit={onLogin} className="login-form">
      <h1>Welcome to ReserveTable!</h1>
      <div className="sign-in-form-error-messages">
        {validationErrors.length > 0 &&
          validationErrors.map(error => (
            <div key={error}>{error}</div>
          ))}
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        {/* <label htmlFor='email'>Email</label> */}
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          className="sign-in-input"
        />
      </div>
      <div>
        {/* <label htmlFor='password'>Password</label> */}
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className="sign-in-input"
        />
        <button type='submit' className="sign-in-form-button1">Login</button>
      </div>
      <div>
        <button onClick={demoUserLogin} className="sign-in-form-button2">Demo User</button>
      </div>
    </form>
  );
};

export default LoginForm;
