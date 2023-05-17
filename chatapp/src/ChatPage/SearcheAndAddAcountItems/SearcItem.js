import React from 'react';

function SearchContact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for searching a contact
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          name="search"
        ></input>
        <button className="btn btn-primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchContact;
