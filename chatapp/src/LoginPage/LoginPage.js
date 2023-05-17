import './LoginPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CheckBox from "./CheckBox";
import userDatabase from "../user_db";
import validateLoginForm from "./validateLoginForm";

function LoginPage({ setUser, loggedIn, setLoggedIn }) {
  const navigate = useNavigate();

  // redirects to chat page if user is logged in
  if(loggedIn) {
    navigate('/');
  }

  // state variables to hold username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // state variable to hold form validation errors
  const [errors, setError] = useState({
    'username' : '',
    'password' : ''
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
    const validationResult = validateLoginForm({username, password});
    setError(validationResult.newErrors);
    errorCondition = validationResult.hasError;

    // if username and password are correct, logs in user
    if (errorCondition === false) {
      let user = userDatabase.getUser(username);
      setUser(user);
      setLoggedIn(true);

      navigate('/', user);
    }
  };

  return (
    // Login form
    <form id="login-form" action="" method="post" className="register-card" onSubmit={handleSubmit}>
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
        <button className="btn btn-primary" type="submit" id="login-button" form="login-form" >Login</button>
      </div>

      {/* <!-- Checkbox to remember user login details --> */}
      <CheckBox title={"Remember me"} id={"flexCheckChecked"} defaultChecked={true} />

      {/* <!-- Forgot password link --> */}
      <div className="row mt-3">
        <div className="psw col">Forgot <a href="#">password?</a></div>

        {/* <!-- Link to registration page --> */}
        <div id="registerlink" className="col">
          Not registered? <Link to='/register'>Click here</Link> to register
        </div>
      </div>
    </form>
  );
}

export default LoginPage;