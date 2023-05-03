import './ChatPage.css';
import ChatWindow from './ChatWindow/ChatWindow';
import LeftColumn from './LeftColumn/LeftColumn';

function ChatPage() {

    return (
        <div className="top">
            <div className="container-fluid">
                <div className="row">
                    <LeftColumn />
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
}

export default ChatPage;
