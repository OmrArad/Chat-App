import './App.css';
import LoginPage from './LoginPage/LoginPage';
import ChatPage from './ChatPage/ChatPage';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom'
import React, { useState } from 'react';
import RegistrationPage from "./RegistrationPage/RegistrationPage";



function App() {
  const [auth, setAuth] = useState(null);

  if(!auth) {
    return (
      <div className="top">
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage setAuth={setAuth}/>} ></Route>
            <Route path='/login' element={<LoginPage setAuth={setAuth}/>} ></Route>
            <Route path='/register' element={<RegisreationPage />} ></Route>
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
            <Route path='/login' element={<LoginPage />} ></Route>
            <Route path='/register' element={<RegisreationPage />} ></Route>
            <Route path='/' element={<ChatPage auth={auth}/>} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
