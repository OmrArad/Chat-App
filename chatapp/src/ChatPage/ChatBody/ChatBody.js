import React, { useState, useEffect, useRef } from 'react';
import ReceivedMessageItem from '../MessageItems/ReceivedMessageItem/ReceivedMessageItem.js';
import SentMessageItem from '../MessageItems/SentMessageItem/SentMessageItem.js';

function ChatBody({ selectedUser, token }) {
    const [messages, setMessages] = useState([]);
    const messageListRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {

            const res = await fetch('http://localhost:5000/api/Chats/' + selectedUser.id + '/Messages', {
                'method': 'get',
                'headers': {
                    'accept': 'text/plain',
                    'Authorization': 'bearer ' + token,
                }
            })
    
            if (res.status == 401)
                alert('Invalid token')
            else if (res.status == 403)
                alert('Token required')
            else if (res.status != 200)
                alert('Something went wrong') // if this case arises it will be added to conditions
            else {
                let messageList = await res.json()
                setMessages(messageList)
            }
        }

        return () => {
            fetchMessages()
        }
    }, [selectedUser, token])
    

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const messageList = messages.map((message, index) => {
        if (message.sender !== selectedUser.user.username) {
            return <ReceivedMessageItem key={index} message={message.content} />; // add time and date to messages
        } else {
            return <SentMessageItem key={index} message={message.content} />; // add time and date to messages
        }
    });

    return (
        <div
            className="card-body"
            id="message-list"
            ref={messageListRef} >
            {messageList}
        </div>
    )

}

export default ChatBody