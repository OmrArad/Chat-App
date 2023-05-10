import './App.css';
import LoginPage from './LoginPage/LoginPage';
import ChatPage from './ChatPage/ChatPage';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom'
import RegistrationPage from "./RegistrationPage/RegistrationPage";



function App() {

  return (
    <div className="top">
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage />} ></Route>
            <Route path='/register' element={<RegistrationPage />} ></Route>
            <Route path='/' element={<ChatPage />} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
