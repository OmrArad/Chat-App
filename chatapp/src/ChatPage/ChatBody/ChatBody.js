import React, { useState, useEffect, useRef } from 'react';
import ReceivedMessageItem from '../MessageItems/ReceivedMessageItem/ReceivedMessageItem.js';
import SentMessageItem from '../MessageItems/SentMessageItem/SentMessageItem.js';
import InputMessageForm from './InputMessageForm/InputMessageForm.js'
import Header from './Header/Header.js';

function ChatBody({ selectedUser, token, setIsNewMessage, switchID }) {
    const [messages, setMessages] = useState([]);
    const messageListRef = useRef(null);
    const contact = selectedUser.user
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

    // only fetch messages on the user we switched to
    useEffect(() => {
        if (selectedUser.id === switchID)
            fetchMessages()
    }, [switchID])

    useEffect(() => {
        // Scroll to the bottom of the message list when new messages are added
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const messageList = messages.slice(0).map((message, index) => {
        if (message.sender.username === contact.username) {
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
            // selectedUser.lastMessage = data.msg
            setIsNewMessage(id)
        }
    }

    return (
        <>
            <Header contact={contact} />
            <div className="card-body" id="message-list" ref={messageListRef} >
                {messageList}
            </div>
            <InputMessageForm selectedUser={selectedUser} onSubmit={handleNewMessage} />
        </>

    )

}

export default ChatBody