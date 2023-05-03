import { useRef } from "react";

function Search({doSearch}) {

    const searchBox = useRef(null);

    const search = function(e){
        doSearch(searchBox.current.value);
    }

    return (
        <form className="mb-3">
            <div className="input-group">
                <input ref={searchBox} onKeyUp={search} type="text" className="form-control" placeholder="Search" name="search"></input>
                <button className="btn btn-primary" type="submit"><i className="fa fa-search"></i></button>
            </div>
        </form>
    );
}

export default Search