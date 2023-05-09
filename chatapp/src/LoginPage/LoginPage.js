import './LoginPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import ChatPage from '../ChatPage/ChatPage';
import Validation from './Validation';
import { useNavigate } from "react-router-dom";


function LoginPage({ setAuth }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setError] = useState({
    name: '',
    password: ''
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

    const newErrors = Validation({ username, password });

    setError(newErrors);

    // authenticate username and password
    if (!newErrors.username && !newErrors.password) {
      setAuth({ username, password });

      navigate('/', {state: {username}});

      setLoggedIn(true);
      setUsername("");
      setPassword("");
      usernameRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
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
      {/* {inputList} */}
      <div className="form-label-group mb-3">
        <label htmlFor='username-input'>Username</label>
        <input
          type="text" 
          id='username-input' 
          ref={usernameRef}
          value={username}
          className="form-control form-floating" 
          placeholder='Enter username' 
          name='Username' 
          required 
          onChange={handleUsernameChange}>
        </input>
      </div>
      {errors.username && <p style={{ color: "red", fontsize: "13px" }}>{errors.username}</p>}

      <div className="form-label-group mb-3">
        <label htmlFor='password-input'>Password</label>
        <input 
          type="password" 
          id='password-input' 
          ref={passwordRef}
          value={password}
          className="form-control form-floating" 
          placeholder='Enter password' 
          name='Password' 
          required 
          onChange={handlePasswordChange}></input>
      </div>
      {errors.password && <p style={{ color: "red", fontsize: "13px" }}>{errors.password}</p>}

      {/* <!-- Login button --> */}
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit" id="login-button">Login</button>
      </div>

      {/* <!-- Checkbox to remember user login details --> */}
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked></input>
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Remember me
        </label>
      </div>

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
