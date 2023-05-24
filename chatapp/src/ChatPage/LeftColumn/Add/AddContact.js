import React from 'react';
import './AddContact.css';
import Modal from './Modal/Modal';
import AddButton from './AddButton/AddButton';

function AddContact({ setContacts, token, setAddedContact }) {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.name.value.trim(); // Trim any leading or trailing whitespace
    if (username === '') {
      return; // Return early if the name is empty
    }
    const data = { username };

    const res = await fetch('http://localhost:5000/api/Chats/', {
      'method': 'post',
      'headers': {
        'accept': '*/*',
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(data)
    })

    if (res.status == 400)
      alert('No such user')
    else if (res.status == 401)
      alert('Invalid token')
    else if (res.status == 403)
      alert('Token required')
    else if (res.status != 200)
      alert('Something went wrong') // if this case arises it will be added to conditions
    else {
      // Added contact successfuly
      setAddedContact(true)
      e.target.reset();
    }


  };

  return (
    <div>
      <AddButton />
      {/* <Modal handleSubmit={handleSubmit} /> */}
      <div
      className="modal fade"
      id="addContactModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addContactModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addContactModalLabel">
              Add new contact
            </h5>
            <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <input type="text" className="form-control" placeholder="Enter name" name="name"></input>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AddContact;