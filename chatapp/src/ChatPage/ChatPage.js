import React, { useState, useEffect, useRef } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './ChatPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import UserComponent from './UsersPanel/usersPanel.js';
import InputMessageForm from './NewMessage/NewMessageItem.js';
import SearchContact from './SearcheAndAddAcountItems/SearcItem.js';
import AddContact from './SearcheAndAddAcountItems/AddItem.js';
import ReceivedMessageItem from './MessageItems/ReceivedMessageItem/ReceivedMessageItem.js';
import SentMessageItem from './MessageItems/SentMessageItem/SentMessageItem.js';
import LoginPage from '../LoginPage/LoginPage';
import { useNavigate } from "react-router-dom";
import LogoutButton from './LogoutButton/LogoutButton';

const ChatPage = ({ username, setCurrentUser, loggedIn, setLoggedIn }) => {

  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messageListRef = useRef(null);
  const navigate = useNavigate();

  console.log(loggedIn)

  useEffect(() => {
    if (username === null) {
      navigate('/login', { state: { setCurrentUser, loggedIn, setLoggedIn } })
    }
  })


  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />;
  });



  const handleNewMessage = (newMessage) => {
    if (newMessage.content.trim() !== '') {
      const updatedMessages = [...messages, { ...newMessage, user: selectedUser }];
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
    }
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);




  function handleLogout(e) {
    e.preventDefault();

    // setLoggedIn(false);

    // navigate to login page
    navigate('/login');
    alert("Logging out");

  };

  const filteredMessages = messages.filter((message) => message.user === selectedUser);

  const messageList = filteredMessages.map((message, index) => {
    if (message.type === 'received') {
      return <ReceivedMessageItem key={index} message={message.content} />;
    } else {
      return <SentMessageItem key={index} message={message.content} />;
    }
  });

  return (
    <div className="row" style={{ maxHeight: '100%' }}>
      <div className="col-md-3">
        <div className="card" id="chat-card" style={{ height: "80%" }}>
          <span className="d-flex flex-column mb-3">
            <LogoutButton/>

            <h3 className="text-center">Chats</h3>
            <AddContact setContacts={setContacts} />
            <img
              src="profile_pics/my_pic.png"
              className="rounded-circle mb-3"
              alt="Your Image"
              width="50"
              height="50"
              style={{ display: 'block', margin: 'auto' }}
            />
          </span>
          <SearchContact setSelectedUser={setSelectedUser} />
          <ul className="list list-group">
            <UserComponent contacts={contacts} setSelectedUser={setSelectedUser} />
          </ul>
        </div>
      </div>
      <div className="col-md-9">
        <div className="card">
          {selectedUser && (
            <div>
              <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src={selectedUser.picture}
                      className="rounded-circle me-3"
                      alt="Your Image"
                      width="50"
                      height="50"
                    />
                    <div className="d-flex flex-column">
                      <h5 className="mb-0">{selectedUser.name}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card-body"
                style={{ height: 'calc(100vh - 200px)', overflowY: 'auto' }}
                ref={messageListRef}
              >
                {messageList}
              </div>
              <InputMessageForm selectedUser={selectedUser} onSubmit={handleNewMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
