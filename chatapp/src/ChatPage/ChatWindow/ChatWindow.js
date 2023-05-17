import SentMessageItem from '../MessageItems/SentMessageItem/SentMessageItem';
import ReceivedMessageItem from '../MessageItems/ReceivedMessageItem/ReceivedMessageItem';
import p2 from '../../../public/profile_pics/p2.png'

function ChatWindow() {
    return (
        <div className="col-md-9 col-sm-9 col-9 chat-window px-1">
            <div id="chat-window" className="card">
                <div className="card-header">
                    <img src={p2} alt="contact-image" className="rounded-circle me-3" width="50"
                        height="50"></img>
                    <h5>Hami Horworitz</h5>
                </div>
                <div className="card-body">
                    <SentMessageItem message={'This is a sent message'} />
                    <ReceivedMessageItem message={'This is a received message'} />
                    <SentMessageItem message={'Another sent message'} />
                    <SentMessageItem message={'Another sent message'} />
                    <ReceivedMessageItem message={'Hello'} />
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
    );
}

export default ChatWindow;