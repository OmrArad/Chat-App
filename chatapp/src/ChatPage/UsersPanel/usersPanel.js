import React from 'react';
import './usersPanel.css';
const UsersPanel = ({ contacts, setSelectedUser, messages }) => {
  
  const getLastMessage = (contact) => {
    if (contact.lastMessage !== null) {
      const lastMessage = contact.lastMessage;
      const stringDate = isSameDay(new Date(Date.parse(lastMessage.created)))
      return {
        content: lastMessage.content,
        time: stringDate,
        unread: false, // New property to determine if the message is unread
      };
    }
    return {
      content: '',
      time: '',
      unread: false, // Default value for unread property
    };
  };

  // only shows date if the message was sent ealrier than today
  const isSameDay = date => {
    const now = new Date()
    if (date.toLocaleDateString() == now.toLocaleDateString())
      return date.toLocaleTimeString()
    return date.toLocaleString()
  }

  return (
    <div>
      {contacts.map((item, index) => {
        const lastMessage = getLastMessage(item);
        return (
          <li
            className="list-group-item"
            key={index}
            onClick={() => setSelectedUser(item)}
          >
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <img
                  src={item.picture}
                  className="rounded-circle me-3"
                  alt="Your Image"
                  width="50"
                  height="50"
                />
                <div className="d-flex flex-column">
                  <h5 className="mb-0">{item.name}</h5>
                  <p className="mb-0">{lastMessage.content}</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0">{lastMessage.time}</p>
                <div className="d-flex justify-content-end">
                  {lastMessage.unread && ( // Only display badge if unread is true
                    <span
                      className="badge bg-primary"
                      id="new-message"
                    >
                      1
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default UsersPanel;
