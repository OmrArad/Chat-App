import React, { useState, useEffect, useRef } from 'react';
import './ChatPage.css';
import UserPanel from './UsersPanel/usersPanel.js';
import InputMessageForm from './NewMessageItem/NewMessageItem.js';
import AddContact from './LeftColumn/Add/AddContact.js';
import { useNavigate } from "react-router-dom";
import LogoutButton from './LogoutButton/LogoutButton';
import ChatBody from './ChatBody/ChatBody';

const ChatPage = ({ userDetails, loggedIn, logout }) => {

  // const [messages, setMessages] = useState([]);
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


  // Also implemented in ChatBody
  // Haven't checked if it works so did not delete
  // Might be deleted later
  // useEffect(() => {
  //   // Scroll to the bottom of the message list when new messages are added
  //   if (messageListRef.current) {
  //     messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  //   }
  // }, [messages]);


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
              <ChatBody selectedUser={selectedUser} token={token}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
