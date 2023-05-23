import React, { useState, useEffect, useRef } from 'react';
import ReceivedMessageItem from '../MessageItems/ReceivedMessageItem/ReceivedMessageItem.js';
import SentMessageItem from '../MessageItems/SentMessageItem/SentMessageItem.js';
import InputMessageForm from '../NewMessageItem/NewMessageItem.js';

function ChatBody({ selectedUser, token }) {
    const [messages, setMessages] = useState([]);
    const messageListRef = useRef(null);
    const user = selectedUser.user
    const id = selectedUser.id

    const fetchMessages = async () => {

        const res = await fetch('http://localhost:5000/api/Chats/' + id + '/Messages', {
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

    useEffect(() => {
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

    const messageList = messages.slice(0).reverse().map((message, index) => {
        if (message.sender !== user.username) {
            return <ReceivedMessageItem key={index} message={message.content} />; // add time and date to messages
        } else {
            return <SentMessageItem key={index} message={message.content} />; // add time and date to messages
        }
    });

    const handleNewMessage = (msg) => {
        if (msg.trim() !== '') {
            const data = { msg }
            sendMessage(data)
        }
    };

    const sendMessage = async (data) => {
        const res = await fetch('http://localhost:5000/api/Chats/' + id + '/Messages', {
            'method': 'post',
            'headers': {
                'accept': 'text/plain',
                'Authorization': 'bearer ' + token,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(data)
        })

        if (res.status == 401)
            alert('Invalid token')
        else if (res.status == 403)
            alert('Token required')
        else if (res.status != 200)
            alert('Something went wrong') // if this case arises it will be added to conditions
        else {
            // Message sent successfuly
            fetchMessages()
        }
    }

    return (
        <>
            <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-row">
                        <img
                            src={user.profilePic}
                            className="rounded-circle me-3"
                            id="user_picture"
                            alt="Your Image"
                            width="50"
                            height="50"
                        />
                        <div className="d-flex flex-column">
                            <h5 className="mb-0">{user.displayName}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="card-body"
                id="message-list"
                ref={messageListRef} >
                {messageList}
            </div>
            <InputMessageForm selectedUser={selectedUser} onSubmit={handleNewMessage} />
        </>

    )

}

export default ChatBody