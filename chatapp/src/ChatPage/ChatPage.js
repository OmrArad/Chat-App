import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import UserComponent from './UsersPanel/usersPanel.js';
import InputMessageForm from './NewMessage/NewMessageItem.js';
import SearchContact from './SearcheAndAddAcountItems/SearcItem.js';
import AddContact from './SearcheAndAddAcountItems/AddItem.js';
import ReceivedMessageItem from './MessageItems/ReceivedMessageItem/ReceivedMessageItem.js';
import SentMessageItem from './MessageItems/SentMessageItem/SentMessageItem.js';
import CurrentFriend from './CurrentFriend/CurrentFriend.js';

const ChatPage = (user) => {
  const inputList = inputs.map((input, key) => {
    return <InputFieldItem {...input} key={key} />;
  });
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messageListRef = useRef(null);

  const handleNewMessage = (newMessage) => {
    if (newMessage.content.trim() !== '') {
      const updatedMessages = [...messages, newMessage];
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

  const messageList = messages.map((message, index) => {
    if (message.type === 'received') {
      return <ReceivedMessageItem key={index} message={message.content} />;
    } else {
      return <SentMessageItem key={index} message={message.content} />;
    }
  });

  return (
    <div className="top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card" id="chat-card">
              <span className="d-flex flex-column mb-3">
                <button
                  className="btn btn-danger"
                  style={{ position: 'absolute', left: '10px', top: '10px' }}
                >
                  <i className="fa fa-sign-out"></i>
                </button>
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
                                  src={selectedUser.pic}
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
            style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
            ref={messageListRef}
            >
            {messageList}
            </div>
            <InputMessageForm
                            selectedUser={selectedUser}
                            handleNewMessage={handleNewMessage}
                          />
            </div>
            )
            }
      </div>
    </div>
    </div>
   </div>
  </div>
);
};

export default ChatPage;

