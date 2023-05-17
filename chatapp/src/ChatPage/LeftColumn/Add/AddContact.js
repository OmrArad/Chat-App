import React from 'react';

function AddContact({ setContacts }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim(); // Trim any leading or trailing whitespace
    if (name === '') {
      return; // Return early if the name is empty
    }
    const randomPicIndex = Math.floor(Math.random() * 5) + 1; // Generate a random index from 1 to 5
    const newContact = { name, picture: `./profile_pics/p${randomPicIndex}.png` };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    e.target.reset();
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#addContactModal"
        style={{ position: 'absolute', right: '10px', top: '10px' }}
      >
        +
      </button>
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