import { React, useRef } from 'react';


function SearchItem({ doSearch }) {


  const searchBox = useRef(null);

  const search = function (e) {
    doSearch(searchBox.current.value);
  }


  return (
    <form className="mb-3">
      <div className="input-group">
        <input
          ref={searchBox}
          onKeyUp={search}
          type="text"
          className="form-control"
          placeholder="Search"
          name="search"
        ></input>
      </div>
    </form>
  );
}

export default SearchItem;
