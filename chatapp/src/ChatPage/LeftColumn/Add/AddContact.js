import React from 'react';
import './AddContact.css';
import Modal from './Modal/Modal';
import AddButton from './AddButton/AddButton';

function AddContact({ token, setAddedContact }) {

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
      let data = await res.json()
      setAddedContact(data.id)
      e.target.reset();
    }
  };

  return (
    <div>
      <AddButton />
      <Modal handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddContact;