import React from 'react';

const UserComponent = ({ contacts, setSelectedUser }) => {
  return (
    <ul className="list-group">
      {contacts.map((item, index) => (
        <li className="list-group-item" key={index} onClick={() => setSelectedUser(item)}>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <img src={item.picture} className="rounded-circle me-3" alt="Your Image" width="50" height="50" />
              <div className="d-flex flex-column">
                <h5 className="mb-0">{item.name}</h5>
                <p className="mb-0">{item.message}</p>
              </div>
            </div>
            <div className="d-flex flex-column">
              <p className="mb-0">{item.time}</p>
              <div className="d-flex justify-content-end">
                <span className="badge bg-primary" style={{ width: '30px', height: '20px', textAlign: 'center' }}>
                  1
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserComponent;
