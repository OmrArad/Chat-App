import './App.css';
import LoginPage from './LoginPage/LoginPage';
import ChatPage from './ChatPage/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import RegistrationPage from "./RegistrationPage/RegistrationPage";


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (currentUser === null) {
      <Routes>
        <Route path='/' element={<LoginPage setUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
        <Route path='/login' element={<LoginPage setUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
        <Route path='/register' element={<RegistrationPage />} ></Route>
      </Routes>
    } else {
      <Routes>
        <Route path='/login' element={<LoginPage setUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
        <Route path='/register' element={<RegistrationPage setUser={setCurrentUser} />} ></Route>
        <Route path='/' element={<ChatPage auth={currentUser} />} ></Route>
      </Routes>
    }
  })

  if (currentUser === null) {
    return (
      <div className="top">
        <div className="container-fluid">
          <Router>
            <Routes>
              <Route path='/' element={<LoginPage setUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
              <Route path='/login' element={<LoginPage setUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
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
            <Route path='/login' element={<LoginPage setUser={setCurrentUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} ></Route>
            <Route path='/register' element={<RegistrationPage setUser={setCurrentUser} />} ></Route>
            <Route path='/' element={<ChatPage auth={currentUser} />} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );


}

export default App;
