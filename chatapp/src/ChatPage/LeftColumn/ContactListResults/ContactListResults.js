import { useEffect, useState } from 'react';
import ChatContact from './ChatContact/ChatContact.js';

function ContactListResults({ contacts, setSelectedUser, setSwitchID }) {

    function getContactList() {
        return (
            contacts.map((contact, key) =>
                <ChatContact
                    contact={contact}
                    key={key}
                    setSelectedUser={setSelectedUser}
                    setSwitchID={setSwitchID} />
            )
        )
    }

    const [contactList, setContactList] = useState(getContactList())

    useEffect(() => {
        setContactList(getContactList())
    }, [contacts])

    return (
        <ul className="list list-group">
            {contactList}
        </ul>
    );
}

export default ContactListResults;