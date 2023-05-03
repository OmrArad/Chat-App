import './ChatPage.css';
import ChatWindow from './ChatWindow/ChatWindow';
import LeftColumn from './LeftColumn/LeftColumn';

function ChatPage() {

    return (
        <div className="row">
            <LeftColumn />
            <ChatWindow />
        </div>
    );
}

export default ChatPage;
