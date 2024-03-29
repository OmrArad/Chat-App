import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import AddContact from './LeftColumn/Add/AddContact.js';
import { useNavigate } from "react-router-dom";
import LogoutButton from './LeftColumn/LogoutButton/LogoutButton';
import ChatBody from './ChatBody/ChatBody';
import ContactListResults from './LeftColumn/ContactListResults/ContactListResults';
import { socketIO } from '../App';

const ChatPage = ({ userDetails, loggedIn, logout }) => {

  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addedContact, setAddedContact] = useState('');
  const [isNewMessage, setIsNewMessage] = useState('');
  const [switchID, setSwitchID] = useState('');
  const navigate = useNavigate();
  const user = userDetails.user
  const token = userDetails.token

  // const doSearch = function (q) {
  //   setContacts(contacts.filter((contact) => contact.name.includes(q)));
  // };

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

  useEffect(() => {
    fetchContactList();
  }, [addedContact, isNewMessage])


  useEffect(() => {
    if (loggedIn === false) {
      navigate('/login');
    }
  })

  useEffect(() => {
    socketIO.on('receive_message', () => {
      fetchContactList();
    })
  }, [])

  return (
    <div className="row chat-page">
      <div className="col-md-3 chat-card">
        <div className="card contacts">
          <span className="d-flex flex-column mb-3">
            <LogoutButton logout={logout} />
            <AddContact
              setContacts={setContacts}
              token={token}
              setAddedContact={setAddedContact} />
          </span>
          <span className="d-flex flex-column mb-3">
            <img
              src={user.profilePic}
              className="rounded-circle mb-3"
              alt="Your Image"
              width="50"
              height="50"
              id="user-picture"
            />
            <h3 className="text-center">{user.displayName}</h3>
          </span>
          {/* <SearchItem doSearch={doSearch} /> */}
          <ContactListResults
            contacts={contacts}
            setSelectedUser={setSelectedUser}
            isNewMessage={isNewMessage}
            setSwitchID={setSwitchID} />
        </div>
      </div>
      <div className="col-md-9 chat-window">
        <div className="card chat-window" >
          {selectedUser && (

            <ChatBody
              selectedUser={selectedUser}
              token={token}
              setIsNewMessage={setIsNewMessage}
              switchID={switchID} />

          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
