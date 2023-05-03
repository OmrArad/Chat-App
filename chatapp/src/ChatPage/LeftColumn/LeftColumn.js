import ContactItem from '../ContactItem/ContactItem';
import contacts from '../ContactItem/contacts';
import UpperSection from './UpperSection/UpperSection';

function LeftColumn() {

    const contactList = contacts.map((contact, key) => {
        return <ContactItem {...contact} key={key} />
    })

    return (
        <div className="col-md-3">
            <div className="card" id="chat-card">
                <UpperSection />

                <form className="mb-3">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" name="search"></input>
                        <button className="btn btn-primary" type="submit"><i className="fa fa-search"></i></button>
                    </div>
                </form>

                <ul className="list-group">
                    {contactList}
                </ul>
            </div>
        </div>
    );
}

export default LeftColumn