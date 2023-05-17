import './ChatPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import SentMessageItem from './MessageItems/SentMessageItem/SentMessageItem';
import ReceivedMessageItem from './MessageItems/ReceivedMessageItem/ReceivedMessageItem';
import ChatComponent from './UsersItem/UsersItem.js';

function ChatPage() {

    const inputList = inputs.map((input, key) => {
        return <InputFieldItem {...input} key={key} />
    })
    
    return (
        <div className="top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card" id="chat-card">
                            <div className="d-flex flex-column align-items-center mb-3">
                                <h1 className="mb-3">Chats</h1>
                                <img src="profile_pics/my_pic.png" className="rounded-circle mb-3" alt="Your Image" width="100"
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

                            <form className="mb-3">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" name="search"></input>
                                    <button className="btn btn-primary" type="submit"><i className="fa fa-search"></i></button>
                                </div>
                            </form>
                            <ul className="list-group">
                                <ChatComponent/>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <img src="profile_pics/p2.png" alt="contact-image" className="rounded-circle me-3" width="50"
                                    height="50"></img>
                                <h5>Hami Horworitz</h5>
                            </div>
                            <div className="card-body">
                                <SentMessageItem message={'This is a sent message'} />
                                <ReceivedMessageItem message={'This is a received message'} />
                                <SentMessageItem message={'Another sent message'} />
                                <SentMessageItem message={'Another sent message'} />
                            </div>
                            <div className="card-footer">
                                <form className="input-message">
                                    <div className="input-group">
                                        <input name="usermsg" type="text" className="form-control" id="usermsg"
                                            placeholder="Type your message"></input>
                                        <button type="submit" className="btn btn-primary"><i className="fa fa-send"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
