import './ChatPage.css';
import ChatWindow from './ChatWindow/ChatWindow';
import LeftColumn from './LeftColumn/LeftColumn';

function ChatPage( {auth} ) {

    return (
        <div className="row">
            <LeftColumn auth={auth}/>
            <ChatWindow />
        </div>
    );
}

export default ChatPage;
