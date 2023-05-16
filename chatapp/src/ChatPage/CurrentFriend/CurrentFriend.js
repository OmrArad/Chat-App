
function CurrentFriend(user) {
    return (
        <div>
            <span className="d-flex flex-row align-items-center mb-3">
                <img
                    src={user.profile_pic}
                    className="rounded-circle mr-2"
                    alt="Your Image"
                    width="50"
                    height="50"
                ></img>
                <h5 className="text-center">{user.name}</h5>
            </span>
        </div>
    );
}

export default CurrentFriend;