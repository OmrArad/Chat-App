import ChatContact from '../../ChatContact/ChatContact.js';

function ContactListResults({ contacts, setSelectedUser }) {

    const contactList = contacts.map((contact) =>
        <ChatContact contact={contact} setSelectedUser={setSelectedUser} />
    )

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