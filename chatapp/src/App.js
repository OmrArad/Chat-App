import './App.css';
import LoginPage from './LoginPage/LoginPage';
import ChatPage from './ChatPage/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react';
import RegistrationPage from "./RegistrationPage/RegistrationPage";



function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = () => currentUser;

  if(currentUser === undefined) {
    return (
      <div className="top">
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage setAuth={setCurrentUser}/>} ></Route>
            <Route path='/login' element={<LoginPage setAuth={setCurrentUser}/>} ></Route>
            <Route path='/register' element={<RegistrationPage setUser={setCurrentUser} />} ></Route>
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
            <Route path='/register' element={<RegistrationPage />} ></Route>
            <Route path='/' element={<ChatPage auth={currentUser}/>} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
