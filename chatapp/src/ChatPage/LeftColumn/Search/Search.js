import { useRef } from "react";

function Search({ doSearch }) {

    const searchBox = useRef(null);

    const search = function (e) {
        doSearch(searchBox.current.value);
    }

    return (
        <form className="mb-3">
            <div className="input-group">
                <input ref={searchBox} onKeyUp={search} type="text" className="form-control" placeholder="Search" name="search"></input>
                <button type="button" className="btn btn-primary" data-toggle="modal"
                    data-target="#addContactModal">+</button>
                <div className="modal fade" id="addContactModal" tabIndex="-1" role="dialog"
                    aria-labelledby="addContactModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addContactModalLabel">Add new contact</h5>
                                <button type="button" className="btn-close" data-dismiss="modal"
                                    aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3 input-group">
                                        <input type="text" className="form-control" placeholder="Enter name"
                                            name="name"></input>
                                        <button type="submit" className="btn btn-primary">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <button className="btn btn-primary" type="submit"><i className="fa fa-search"></i></button> */}
            </div>
        </form>
    );
}

export default Search