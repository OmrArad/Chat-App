import { useEffect, useState } from 'react';
import ChatContact from '../../ChatContact/ChatContact.js';

function ContactListResults({ contacts, setSelectedUser, isNewMessage }) {

    const [contactList, setContactList] = useState(contacts.map((contact, key) =>
        <ChatContact contact={contact} setSelectedUser={setSelectedUser} key={key} isNewMessage={isNewMessage} />
    ))

    useEffect(() => {
        setContactList(contacts.map((contact, key) =>
            <ChatContact contact={contact} setSelectedUser={setSelectedUser} key={key} isNewMessage={isNewMessage} />
        ))
    }, [contacts])

    return (
        <ul className="list list-group">
            {contactList}
            {/* <UserPanel
              contacts={contacts}
              setSelectedUser={setSelectedUser}
            /> */}
        </ul>
    );
}

export default ContactListResults;