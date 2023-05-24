import './LoginPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CheckBox from "./CheckBox/CheckBox";
import validateLoginForm from "./ValidateLoginForm/validateLoginForm";
import RegisterLink from './RegisterLink/RegisterLink';

function LoginPage({ loggedIn, login }) {
  const navigate = useNavigate();

  // redirects to chat page if user is logged in
  if (loggedIn) {
    navigate('/');
  }

  // state variables to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state variable to hold form validation errors
  const [errors, setError] = useState({
    'username': '',
    'password': ''
  });

  // flag to track whether form has errors
  let errorCondition = false;

  // event handlers to update state variables on input change
  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  // function to handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    // validate form input and update errors state variable
    const validationResult = validateLoginForm({ username, password });
    setError(validationResult.newErrors);
    errorCondition = validationResult.hasError;

    // if username and password are correct, logs in user
    if (errorCondition === false) {
      
      const data = { username, password }

      handleLogin(data)

    }
  };

  const handleLogin = async (data) => {
    const res = await fetch('http://localhost:5000/api/Tokens', {
      'method': 'post',
      'headers': {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      'body': JSON.stringify(data)
    })

    if (res.status === 404) {
      alert('Invalid username and/or password')
    }
    else if (res.status !== 200)
      alert('Something went wrong') // if this case arises it will be added to conditions
    else {
      // Correct username/password
      // Fetch user details and navigate to chat page
      // The server's response
      const token = await res.json()
      const loginData = { username, token }
      fetchUserDetails(loginData)
    }
  }

  const fetchUserDetails = async (loginData) => {
    const token = loginData.token
    const res = await fetch('http://localhost:5000/api/Users/' + loginData.username, {
      'method': 'get',
      'headers': {
        'accept': 'text/plain',
        'Authorization': 'bearer ' + loginData.token,
      }
    })

    if (res.status === 401)
      alert('Login authentication error')
    else if (res.status === 403)
      alert('Authentication required')
    else if (res.status !== 200)
      alert('Something went wrong') // if this case arises it will be added to conditions
    else {
      const user = await res.json()
      login({ user, token })
      navigate('/', { user, token }); // attach the token
      // return user;
    }
  }

  return (
    // Login form
    <form id="login-form" action="" method="post" className="register-card">
      <h1>Login</h1>

      {/* <!-- ChatApp image --> */}
      <img src="chat-06.jpg" className="rounded mx-auto d-block avatar" alt="Avatar"></img>

      {/* <!-- Username and Password input fields --> */}
      <InputFieldItem title={"Username"} id={"username-input"} type={"text"} placeholder={"Enter username"}
        handleBlur={handleUsernameChange} error={errors.username} />
      <InputFieldItem title={'Password'} id={'password-input'} type={'password'} placeholder={'Enter password'}
        handleBlur={handlePasswordChange} error={errors.password} />
      {/* <!-- Login button --> */}
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" id="login-button" form="login-form" onClick={handleSubmit}>Login</button>
      </div>

      {/* <!-- Checkbox to remember user login details --> */}
      <CheckBox title={"Remember me"} id={"flexCheckChecked"} defaultChecked={true} />

      {/* <!-- Forgot password link --> */}
      <div className="row mt-3">
        <div className="psw col">Forgot <a href="#">password?</a></div>

        {/* <!-- Link to registration page --> */}
        <RegisterLink />
      </div>
    </form>
  );
}

export default LoginPage;