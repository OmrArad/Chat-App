import './LoginPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import ChatPage from '../ChatPage/ChatPage';
import { useNavigate } from "react-router-dom";
import CheckBox from "./CheckBox";
import userDatabase from "../userArray";

function LoginPage({ setUser }) {


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
  const [errorCondition, setErrorCondition] = useState(false);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  if(loggedIn) {
    return <ChatPage />
  }

  function validateLoginForm(values) {
    const newErrors = {};

    console.log("values: " + values);
    /* check for password */
    if(!values.password) {
      newErrors.password = "Password required"
      setErrorCondition(true);
    }

    /* check for username */
    if (!values.username) {
      newErrors.username = "Username required";
      setErrorCondition(true);
    } else if (!userDatabase.containsUser(values.username)) {
      newErrors.username = "User " + values.username + " does not exist";
      setErrorCondition(true);
    } else {
      let user = userDatabase.getUser(values.username);
      if (user.password !== values.password) {
        newErrors.password = "Password is incorrect"
        setErrorCondition(true);
      }
    }
    console.log("errors: " + newErrors);
    return newErrors;
  }


  function handleSubmit(e) {
    e.preventDefault();

    console.log("login submit");
    const newErrors = validateLoginForm({ username, password });
    console.log("errors: " + newErrors);
    setError(newErrors);

    // authenticate username and password
    if (errorCondition === false) {
      const user = userDatabase.getUser(username);
      setUser(user);

      navigate('/', {state: {username}});

      setLoggedIn(true);
      setUsername("");
      setPassword("");
      //usernameRef.current.focus();
    } /* else {
      passwordRef.current.focus();
    }*/
  }

  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />
  })

  return (
    // Login form
    <form id="login-form" action="" method="post" className="register-card" onSubmit={handleSubmit}>
      <h1>Login</h1>

      {/* <!-- ChatApp image --> */}
      <img src="chat-06.jpg" className="rounded mx-auto d-block avatar" alt="Avatar"></img>

      {/* <!-- Username and Password input fields --> */}
      <InputFieldItem title={"Username"} id={"username-input"} type={"text"} placeholder={"Enter username"}
                      handleChange={handleUsernameChange} error={errors.username} />
      <InputFieldItem title={'Password'} id={'password-input'} type={'password'} placeholder={'Enter password'}
                      handleChange={handlePasswordChange} error={errors.password} />
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
