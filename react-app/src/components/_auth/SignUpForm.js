import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({ setShowSignUpModal }) => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState('');
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!username) errors.push("Please select a username");
    if (!email) errors.push("Please enter your email address");
    if (!firstName) errors.push("Please enter your first name");
    if (!lastName) errors.push("Please enter your last name");
    if (!password) errors.push("Please select a password");
    if (!repeatPassword) errors.push("Please confirm your password");

    setValidationErrors(errors);

    if (!errors.length) {
      if (password === repeatPassword) {
        const data = await dispatch(signUp(username, email, firstName, lastName, password));
        if (data) {
          const backendErrors = [];
          data.forEach(error => {
            let arr = error.split(': ');
            backendErrors.push(arr[1])
          })
          setErrors(backendErrors)
        } else {
          setShowSignUpModal(false)
        }
      } else {
        errors.push("Please double check your confirm password.")
      }
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className="sign-up-form">
      <div className="sign-up-form-container">
        <h1>Welcome to ReserveTable</h1>
        <div className="sign-up-form-error-messages">
          {validationErrors.length > 0 &&
            validationErrors.map(error =>
              <div key={error}>{error}</div>
            )}
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>

        <div>
          {/* <label>Username</label> */}
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder="Username"
          ></input>
        </div>
        <div>
          {/* <label>Email</label> */}
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder="Email"
          ></input>
        </div>
        <div>
          {/* <label>First name</label> */}
          <input
            type='text'
            name='first_name'
            onChange={updateFirstName}
            value={firstName}
            placeholder="First name"
          ></input>
        </div>
        <div>
          {/* <label>Last name</label> */}
          <input
            type='text'
            name='last_name'
            onChange={updateLastName}
            value={lastName}
            placeholder="Last name"
          ></input>
        </div>
        <div>
          {/* <label>Password</label> */}
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder="Password"
          ></input>
        </div>
        <div>
          {/* <label>Repeat Password</label> */}
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            placeholder="Confirm password"
          // required={true}
          ></input>
        </div>
        <button type='submit' className="sign-up-form-button">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
