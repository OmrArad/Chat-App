import React from 'react';
import './ChatPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import UserComponent from './UsersItem/UsersItem.js';
import CurrentChatItem from './CurrentChat/CurrentChatItem.js';
import InputMessageForm from './NewMessage/NewMessageItem.js';
import AddContact from './SearcheAndAddAcountItems/SearcItem.js';
import SearchContact from './SearcheAndAddAcountItems/AddItem.js';

function ChatPage() {
  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />;
  });

  return (
    <div className="top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card" id="chat-card">
              <div className="d-flex flex-column align-items-center mb-3">
                <h1 className="mb-3">Chats</h1>
                <img
                  src="profile_pics/my_pic.png"
                  className="rounded-circle mb-3"
                  alt="Your Image"
                  width="100"
                  height="100"
                ></img>
                <AddContact />
              </div>
              <SearchContact />
              <ul className="list-group">
                <UserComponent />
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card">
              <CurrentChatItem />
              <div className="card-footer">
                <InputMessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
