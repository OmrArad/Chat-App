import my_pic from '../../ContactItem/profile_pics/my_pic.png'

function UpperSection() {

    return (
        <div className="d-flex flex-column align-items-center mb-3">
            <h1 className="mb-3">Chats</h1>
            <img src={my_pic} className="rounded-circle mb-3" alt="Your Image" width="100"
                height="100"></img>
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
        </div>
    );
}

export default UpperSection;