import { useEffect, useState } from 'react';
import ChatContact from '../ChatContact/ChatContact.js';

function ContactListResults({ contacts, setSelectedUser }) {

    const [contactList, setContactList] = useState(contacts.map((contact, key) =>
        <ChatContact contact={contact} setSelectedUser={setSelectedUser} key={key} />
    ))

    useEffect(() => {
        setContactList(contacts.map((contact, key) =>
            <ChatContact contact={contact} setSelectedUser={setSelectedUser} key={key} />
        ))
    }, [contacts])

    return (
        <ul className="list list-group">
            {contactList}
        </ul>
    );
}

export default ContactListResults;