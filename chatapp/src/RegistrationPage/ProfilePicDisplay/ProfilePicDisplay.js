import React from "react";

function ProfilePicDisplay({path}) {
    if (!path) {
        return <div></div>;
    }
    return (
        <div id="image-row" className="row mb-3">
            <img id="profile_img" src={path} alt="profile picture" />
        </div>
    );
}

export default ProfilePicDisplay;