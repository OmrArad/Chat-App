function ContactItem({ profile_pic, name, time_and_date, last_message }) {
    return (
        <li className="list-group-item list-group-item-action">
            <div className="row align-items-left">
                <div className="col-3">
                    <img className="chat-icon rounded-circle me-3" src={profile_pic} alt="Your Image" width="50"
                        height="50"></img>
                </div>
                <div className="col-9">
                    <h5 className="mb-0 text-align-left">{name}</h5>
                    <small>{time_and_date}</small>
                </div>

            </div>
            <div>
                <p className="mb-0">{last_message}</p>
            </div>
        </li>
    );
}

export default ContactItem;