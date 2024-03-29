// Not in use
// Instead use ChatContact
// Do not delete yet

import React, { useEffect, useState } from 'react';
import './usersPanel.css';

const UsersPanel = ({ contacts, setSelectedUser}) => {

  const getLastMessage = (contact) => {
    if (contact.lastMessage !== null) {
      const lastMessage = contact.lastMessage;
      const stringDate = isSameDay(new Date(Date.parse(lastMessage.created)), true)
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

  // Returns time for messages sent today, otherwise returns date
  const isSameDay = (date, apply) => {
    if (apply) {
      const now = new Date()
      if (date.toLocaleDateString() == now.toLocaleDateString())
        return date.toLocaleTimeString()
    }
    return date.toLocaleDateString()
  }

  return (
    <div>
      {contacts.map((item, index) => {
        const user = item.user
        const lastMessage = getLastMessage(item)
        return (
          <li
            className="list-group-item"
            key={index}
            onClick={() => setSelectedUser(item)}
          >
            <div className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <img
                  src={user.profilePic}
                  className="rounded-circle me-3"
                  alt="Your Image"
                  width="50"
                  height="50"
                />
                <div className="d-flex flex-column">
                  <h5 className="mb-0">{user.displayName}</h5>
                  <p className="mb-0">{lastMessage.content}</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <p className="mb-0 time">{lastMessage.time}</p>
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
