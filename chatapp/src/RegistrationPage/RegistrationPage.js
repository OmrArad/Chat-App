import './RegistrationPage.css';
import { Link } from 'react-router-dom'
import InputFieldItem from "../InputFieldItem/InputFieldItem";
import SubmitButton from "../SubmitButton/SubmitButton";
import React, {useState} from "react";
import ProfilePicDisplay from "./ProfilePicDisplay/ProfilePicDisplay";

function RegistrationPage() {
    const [profilePicPath, setProfilePicPath] = useState("");

    const handleFileUpload = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            console.log(file);
            const filePath = URL.createObjectURL(file);
            console.log(filePath)
            setProfilePicPath(filePath);
        }
    };

    return (
        /* Registration form */
        <form className="register-card">
            <h1>
                Register
            </h1>
            {/* Input field for username */}
            <InputFieldItem title={"Username"} type={"text"} id={"username-input"} placeholder={"Enter username"}/>
            {/* Input field for password */}
            <InputFieldItem title={"Password"} type={"password"} id={"password-input"} placeholder={"Enter password"}/>
            {/* Input field for password confirmation */}
            <InputFieldItem title={"Verify password"} type={"password"} id={"conf-pass-input"} placeholder={"Reenter password"}/>
            {/* Input field for display name */}
            <InputFieldItem title={"Display name"} type={"text"} id={"displayname-input"} placeholder={"Enter display name"}/>
            {/* Input field for uploading profile picture */}
            <InputFieldItem title={"Picture"} type={"file"} id={"upload-picture-input"} placeholder={""}
                            handleFileUpload={handleFileUpload} />
            {/* Display uploaded image */}
            <ProfilePicDisplay path={profilePicPath} />
            {/* Button for registration submission */}
            <div id="register-row" className="row">
                <SubmitButton title={"Register"} type={"submit"} id={"register-button"}/>
                {/* Link for already registered users to login */}
                <div id="already-registered-txt" className="col text-sm-center">
                    Already registered?{" "}
                    <Link id="login-link" to='/login'>
                        Click here
                    </Link>{" "}
                    to login
                </div>
            </div>
        </form>
    );
}

export default RegistrationPage;