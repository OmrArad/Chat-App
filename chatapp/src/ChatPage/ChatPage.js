import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';
import UserPanel from './UsersPanel/usersPanel.js';
import InputMessageForm from './NewMessageItem/NewMessageItem.js';
import AddContact from './LeftColumn/Add/AddContact.js';
import ReceivedMessageItem from './MessageItems/ReceivedMessageItem/ReceivedMessageItem.js';
import SentMessageItem from './MessageItems/SentMessageItem/SentMessageItem.js';
import { useNavigate } from "react-router-dom";
import LogoutButton from './LogoutButton/LogoutButton';
import ChatBody from './ChatBody/ChatBody';

const ChatPage = ({ userDetails, loggedIn, logout }) => {

  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const messageListRef = useRef(null);
  const navigate = useNavigate();
  const user = userDetails.user
  const token = userDetails.token

  // const doSearch = function (q) {
  //   setContacts(contacts.filter((contact) => contact.name.includes(q)));
  // };

  useEffect(() => {
    // Fetch user's contacts from server
    const fetchContactList = async () => {
      const res = await fetch('http://localhost:5000/api/Chats/', {
        'method': 'get',
        'headers': {
          'accept': 'text/plain',
          'Authorization': 'bearer ' + token,
        }
      })

      if (res.status == 401)
        alert('Invalid token')
      else if (res.status == 403)
        alert('Token required')
      else if (res.status != 200)
        alert('Something went wrong') // if this case arises it will be added to conditions
      else {
        const contactList = await res.json()
        setContacts(contactList)
      }
    }

    fetchContactList();
  }, [])

  useEffect(() => {
    if (loggedIn === false) {
      navigate('/login');
    }
  })

  const handleNewMessage = (newMessage) => {
    if (newMessage.content.trim() !== '') {
      const updatedMessages = [...messages, { ...newMessage, user: selectedUser }];
      setMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // const filteredMessages = messages.filter((message) => message.user === selectedUser);

  // const messageList = filteredMessages.map((message, index) => {
  //   if (message.type === 'received') {
  //     return <ReceivedMessageItem key={index} message={message.content} />;
  //   } else {
  //     return <SentMessageItem key={index} message={message.content} />;
  //   }
  // });

  return (
    <div className="row">
      {/* <LeftColumn
        setSelectedUser={setSelectedUser}
        setMessages={setMessages}
        message={messages}
      /> */}
      <div className="col-md-3">
        <div className="card" id="chat-card">
          <span className="d-flex flex-column mb-3">
            <LogoutButton logout={logout} />
            <h3 className="text-center">{user.displayName}</h3>
            <AddContact setContacts={setContacts} />
            <img
              src={user.profilePic}
              className="rounded-circle mb-3"
              alt="Your Image"
              width="50"
              height="50"
              id="user-picture"
            />
          </span>
          {/* <SearchItem doSearch={doSearch} /> */}
          <ul className="list list-group">
            <UserPanel
              contacts={contacts}
              setSelectedUser={setSelectedUser}
            />
          </ul>
        </div>
      </div>
      <div className="col-md-9">
        <div className="card" id='chat-window'>
          {selectedUser && (
            <div>
              <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex flex-row">
                    <img
                      src={selectedUser.user.profilePic}
                      className="rounded-circle me-3"
                      id="user_picture"
                      alt="Your Image"
                      width="50"
                      height="50"
                    />
                    <div className="d-flex flex-column">
                      <h5 className="mb-0">{selectedUser.user.displayName}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <ChatBody selectedUser={selectedUser} token={token}/>
              {/* <div
                className="card-body"
                id="message-list"
                ref={messageListRef} >
                {messageList}
              </div> */}
              <InputMessageForm selectedUser={selectedUser} onSubmit={handleNewMessage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
