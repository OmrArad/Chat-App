// import './App.css';
import InputFieldItem from './InputFieldItem/InputFieldItem';
import inputs from './InputFieldItem/inputs';
import ChatPage from './ChatPage/ChatPage';
import LoginPage from './LoginPage/LoginPage';
import SentMessageItem from './ChatPage/ChatPage/SentMessageItem/SentMessageItem.js';


function App() {

  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />
  })

  return (
     <ChatPage/>
    //<LoginPage />
  );
}

export default App;
