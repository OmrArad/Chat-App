import { useEffect, useState } from 'react';
import ChatContact from './ChatContact/ChatContact.js';

function ContactListResults({ contacts, setSelectedUser, setSwitchID }) {

    const [contactList, setContactList] = useState(contacts.map((contact, key) =>
        <ChatContact
            contact={contact}
            setSelectedUser={setSelectedUser}
            key={key}
            setSwitchID={setSwitchID} />
    ))

    useEffect(() => {
        setContactList(contacts.map((contact, key) =>
            <ChatContact
                contact={contact}
                setSelectedUser={setSelectedUser}
                key={key}
                setSwitchID={setSwitchID} />
        ))
    }, [contacts])

    return (
        <ul className="list list-group">
            {contactList}
        </ul>
    );
}

export default ContactListResults;