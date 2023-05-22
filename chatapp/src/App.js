import './App.css';
import LoginPage from './LoginPage/LoginPage';
import ChatPage from './ChatPage/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import RegistrationPage from "./RegistrationPage/RegistrationPage";


function App() {

  // state variable that holds the current user
  const [currentUser, setCurrentUser] = useState(null);
  // state variable flag for whether a user is logged in
  const [loggedIn, setLoggedIn] = useState(false);

  const doLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  }

  const doLogin = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
  }

  if(loggedIn === false) {
    return (
      <div className="top">
        <div className="container-fluid">
          <Router>
            <Routes>
              <Route path='/' element={<LoginPage loggedIn={loggedIn} login={doLogin} />} ></Route>
              <Route path='/login' element={<LoginPage loggedIn={loggedIn} login={doLogin} />} ></Route>
              <Route path='/register' element={<RegistrationPage />} ></Route>
            </Routes>
          </Router>
        </div>
      </div>
    );
  }

  return (
    <div className="top">
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage setUser={setCurrentUser} login={doLogin} />} ></Route>
            <Route path='/register' element={<RegistrationPage />} ></Route>
            <Route path='/' element={<ChatPage userDetails={currentUser} loggedIn={loggedIn} logout={doLogout} />} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
