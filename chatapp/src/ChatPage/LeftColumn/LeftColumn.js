import { useState } from 'react';
import contacts from '../ContactItem/contacts';
import Search from './Search/Search';
import UpperSection from './UpperSection/UpperSection';
import ContactListResults from './ContactListResults/ContactListResults';

function LeftColumn( {auth} ) {

    const [contactList, setContactList] = useState(contacts);

    const doSearch = function(q){ 
        setContactList(contacts.filter((contact) => contact.name.includes(q)));
    };

    return (
        <div className="col-md-3 col-sm-3 col-3 px-1">
            <div className="card" id="chat-card">
                <UpperSection auth={auth}/>

                <Search doSearch={doSearch} />

                <ContactListResults contacts={contactList} />
            </div>
        </div>
    );
}

export default LeftColumn