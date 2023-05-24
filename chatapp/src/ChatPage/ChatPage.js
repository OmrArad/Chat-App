import React, { useState, useEffect } from 'react';
import './ChatPage.css';
import AddContact from './LeftColumn/Add/AddContact.js';
import { useNavigate } from "react-router-dom";
import LogoutButton from './LogoutButton/LogoutButton';
import ChatBody from './ChatBody/ChatBody';
import ContactListResults from './LeftColumn/ContactListResults/ContactListResults';

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
  }, [addedContact, isNewMessage])


  useEffect(() => {
    if (loggedIn === false) {
      navigate('/login');
    }
  })


  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card" id="chat-card">
          <span className="d-flex flex-column mb-3">
            <LogoutButton logout={logout} />
            <h3 className="text-center">{user.displayName}</h3>
            <AddContact
              setContacts={setContacts}
              token={token}
              setAddedContact={setAddedContact} />
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
          <ContactListResults
            contacts={contacts}
            setSelectedUser={setSelectedUser}
            isNewMessage={isNewMessage}
            setSwitchID={setSwitchID} />
        </div>
      </div>
      <div className="col-md-9">
        <div className="card" id='chat-window'>
          {selectedUser && (
            <div>
              <ChatBody
                selectedUser={selectedUser}
                token={token}
                setIsNewMessage={setIsNewMessage}
                switchID={switchID} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
