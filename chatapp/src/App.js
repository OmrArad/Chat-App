import './App.css';
import LoginPage from './LoginPage/LoginPage';
import RegisreationPage from './RegistrationPage/RegistrationPage';
import ChatPage from './ChatPage/ChatPage';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom'



function App() {

  return (
    <div className="top">
      <div className="container-fluid">
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} ></Route>
            <Route path='/register' element={<RegisreationPage />} ></Route>
            <Route path='/' element={<ChatPage />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
