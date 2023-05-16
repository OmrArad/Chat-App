import ContactItem from '../../ContactItem/ContactItem';

function ContactListResults({ contacts }) {

    const contactList = contacts.map((contact, key) => {
        return <ContactItem {...contact} key={key} />
    });

    return (
        <ul className="list-group">
            {contactList}
        </ul>
    );
}

export default ContactListResults;