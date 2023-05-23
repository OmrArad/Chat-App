function Header({contact}) {
    return (
        <div className="card-header">
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row">
                    <img
                        src={contact.profilePic}
                        className="rounded-circle me-3"
                        id="user_picture"
                        alt="Your Image"
                        width="50"
                        height="50"
                    />
                    <div className="d-flex flex-column">
                        <h5 className="mb-0">{contact.displayName}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header