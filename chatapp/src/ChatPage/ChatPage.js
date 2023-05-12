import React from 'react';
import { useState } from 'react';
import './ChatPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import UserComponent from './UsersItem/UsersItem.js';
import CurrentChatItem from './CurrentChat/CurrentChatItem.js';
import InputMessageForm from './NewMessage/NewMessageItem.js';
import SearchContact from './SearcheAndAddAcountItems/SearcItem.js';
import AddContact from './SearcheAndAddAcountItems/AddItem.js';

function ChatPage() {
  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />;
  });
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card" id="chat-card">
              <span className="d-flex flex-column mb-3">
                <h3 className="text-center">Chats</h3>
                <AddContact/>
                <img
                  src="profile_pics/my_pic.png"
                  className="rounded-circle mb-3"
                  alt="Your Image"
                  width="50"
                  height="50"
                  style={{display: 'block', margin: 'auto'}}
                ></img>
              </span>
              <SearchContact/>
              <ul className="list-group">
                <UserComponent />
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <CurrentChatItem />
              <div className="card-footer">
                <InputMessageForm onSubmit={handleNewMessage}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
