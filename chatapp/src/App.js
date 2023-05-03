import './App.css';
import InputFieldItem from './InputFieldItem/InputFieldItem';
import inputs from './InputFieldItem/inputs';
import ChatPage from './ChatPage/ChatPage';
// import LoginPage from './LoginPage/LoginPage';
import { BrowserRouter as Router, Route, NavLink, BrowserRouter, Routes } from 'react-router-dom'
import LoginPage from './LoginPage/LoginPage';


function App() {

  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />
  })

  return (
    <div className="top">
      <div className="container-fluid">
        <BrowserRouter>
          <Routes>
            <Route path='/details' element={<LoginPage />} ></Route>
            {/* <Route path='' element={<LoginPage />} ></Route> */}
            <Route path='/' element={<ChatPage />} ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
