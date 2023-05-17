import React from 'react';

const UserComponent = ({ contacts, setSelectedUser, messages }) => {
  const getLastMessage = (contact) => {
    const filteredMessages = messages.filter(
      (message) => message.user === contact
    );
    if (filteredMessages.length > 0) {
      const lastMessage = filteredMessages[filteredMessages.length - 1];
      return {
        content: lastMessage.content,
        time: lastMessage.timestamp.toLocaleTimeString(),
        unread: lastMessage.unread, // New property to determine if the message is unread
      };
    }
    return {
      content: '',
      time: '',
      unread: false, // Default value for unread property
    };
  };

  return (
    <ul className="list-group">
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
                      style={{
                        width: '30px',
                        height: '20px',
                        textAlign: 'center',
                      }}
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
    </ul>
  );
};

export default UserComponent;
