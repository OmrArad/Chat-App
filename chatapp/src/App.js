// import './App.css';
import InputFieldItem from './InputFieldItem/InputFieldItem';
import inputs from './InputFieldItem/inputs';
import ChatPage from './ChatPage/ChatPage';
// import LoginPage from './LoginPage/LoginPage';

function App() {

  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />
  })

  return (
    <ChatPage />
    // <LoginPage />
  );
}

export default App;
