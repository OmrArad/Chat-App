import './ChatPage.css';
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import inputs from '../InputFieldItem/inputs';
import SentMessageItem from './SentMessageItem/SentMessageItem';
import ReceivedMessageItem from './MessageItems/ReceivedMessageItem/ReceivedMessageItem';

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
                                {/* <!-- Add more list items as needed --> */}
                                <li className="list-group-item list-group-item-action">
                                    <img src="profile_pics/p1.png" alt="Your Image" className="rounded-circle me-3" width="50"
                                        height="50"></img>
                                    <div>
                                        <h5 className="mb-1">Sapir Mosi</h5>
                                        <small>12/1/2023 16:45</small>
                                        <p className="mb-0">Hey!!!</p>
                                    </div>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <img className="chat-icon rounded-circle me-3" src="profile_pics/p2.png" alt="Your Image" width="50"
                                        height="50"></img>
                                    <div>
                                        <h5 className="mb-1">Ido Moshe</h5>
                                        <small>12/1/2023 16:45</small>
                                        <p className="mb-0">You: Are you coming today?</p>
                                    </div>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <img className="chat-icon rounded-circle me-3" src="profile_pics/p3.png" alt="Your Image" width="50"
                                        height="50"></img>
                                    <div>
                                        <h5 className="mb-1">Yoav Raz</h5>
                                        <small>12/1/2023 16:45</small>
                                        <p className="mb-0">You: What? No way!</p>
                                    </div>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <img className="chat-icon rounded-circle me-3" src="profile_pics/p4.png" alt="Your Image" width="50"
                                        height="50"></img>
                                    <div>
                                        <h5 className="mb-1">Shira Dan</h5>
                                        <small>12/1/2023 16:45</small>
                                        <p className="mb-0">Shira: I love that song</p>
                                    </div>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                    <img className="chat-icon rounded-circle me-3" src="profile_pics/p5.png" alt="Your Image" width="50"
                                        height="50"></img>
                                    <div>
                                        <h5 className="mb-1">Sara Paz</h5>
                                        <small>12/1/2023 16:45</small>
                                        <p className="mb-0">You: Are you going to the party?</p>
                                    </div>
                                </li>
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
