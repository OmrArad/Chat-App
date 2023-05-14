import './LoginPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import ChatPage from '../ChatPage/ChatPage';
import { useNavigate } from "react-router-dom";
import CheckBox from "./CheckBox";
import userDatabase from "../userArray";

function validateLoginForm(values) {
  let errors = {};

  /* check for password */
  if(!values.password) {
    errors.password = "Password required"
  }

  /* check for username */
  if (!values.username) {
    errors.username = "Username required";
  } else if (!userDatabase.containsUser(values.username)) {
    errors.username = "User " + values.username + " does not exist";
  } else {
    let user = userDatabase.getUser(values.username);
    if (user.password !== values.password) {
      errors.password = "Password is incorrect"
    }
  }

  return errors;
}

function LoginPage({ setAuth }) {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setError] = useState({
    'username' : '',
    'password' : ''
  });

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if(loggedIn) {
    return <ChatPage />
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validateLoginForm({ username, password });

    setError(newErrors);

    // authenticate username and password
    if (newErrors === {}) {
      const user = userDatabase.getUser(username);
      setAuth(user);

      navigate('/', {state: {username}});

      setLoggedIn(true);
      setUsername("");
      setPassword("");
      //usernameRef.current.focus();
    } /* else {
      passwordRef.current.focus();
    }*/
  };

  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />
  })

  return (
    // Login form
    <form action="" method="post" className="register-card" onSubmit={handleSubmit}>
      <h1>Login</h1>

      {/* <!-- ChatApp image --> */}
      <img src="chat-06.jpg" className="rounded mx-auto d-block avatar" alt="Avatar"></img>

      {/* <!-- Username and Password input fields --> */}
      <InputFieldItem title={"Username"} id={"username-input"} type={"text"} placeholder={"Enter username"}
                      handleChange={handleUsernameChange} error={errors.username} />
      {errors.username && <p className={'inputErrorText'}>{errors.username}</p>}
      <InputFieldItem title={'Password'} id={'password-input'} type={'password'} placeholder={'Enter password'}
                      handleChange={handlePasswordChange} error={errors.password} />
      {errors.password && <p className={'inputErrorText'} >{errors.password}</p>}

      {/* <!-- Login button --> */}
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" id="login-button">Login</button>
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
