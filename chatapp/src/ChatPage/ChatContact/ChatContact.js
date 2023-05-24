import { useEffect, useState } from "react";

function ChatContact({contact, setSelectedUser}) {
    const user = contact.user
    // const lastMessage = getLastMessage(contact)

    const getLastMessage = (contact) => {
        if (contact.lastMessage !== null) {
            const lastMessage = contact.lastMessage;
            const stringDate = isSameDay(new Date(Date.parse(lastMessage.created)), true)
            const returnMsg = {
                content: lastMessage.content,
                time: stringDate,
                unread: false, // New property to determine if the message is unread
            }
            return {
                content: lastMessage.content,
                time: stringDate,
                unread: false, // New property to determine if the message is unread
            };
        }
        return {
            content: '',
            time: '',
            unread: false, // Default value for unread property
        };
    };

    // Returns time for messages sent today, otherwise returns date
    const isSameDay = (date, apply) => {
        if (apply) {
            const now = new Date()
            if (date.toLocaleDateString() == now.toLocaleDateString())
                return date.toLocaleTimeString()
        }
        return date.toLocaleDateString()
    }

    const [lastMessage, setLastMessage] = useState(getLastMessage(contact))

    // This should update the last message - swagger implementation does not update so no change
    useEffect(() => {
        setLastMessage(getLastMessage(contact))
    }, [contact])


    return (
        <li
            className="list-group-item"
            onClick={() => setSelectedUser(contact)}
        >
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                    <img
                        src={user.profilePic}
                        className="rounded-circle me-3"
                        alt="Your Image"
                        width="50"
                        height="50"
                    />
                    <div className="d-flex flex-column">
                        <h5 className="mb-0">{user.displayName}</h5>
                        <p className="mb-0">{lastMessage.content}</p>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <p className="mb-0 time">{lastMessage.time}</p>
                    <div className="d-flex justify-content-end">
                        {lastMessage.unread && ( // Only display badge if unread is true
                            <span
                                className="badge bg-primary"
                                id="new-message"
                            >
                                1
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ChatContact