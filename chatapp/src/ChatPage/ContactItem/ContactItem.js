function ContactItem({ profile_pic, name, time_and_date, last_message }) {
    return (
        <li className="list-group-item list-group-item-action">
            <img className="chat-icon rounded-circle me-3" src={profile_pic} alt="Your Image" width="50"
                height="50"></img>
            <div>
                <h5 className="mb-1">{name}</h5>
                <small>{time_and_date}</small>
                <p className="mb-0">{last_message}</p>
            </div>
        </li>
    );
}

export default ContactItem;