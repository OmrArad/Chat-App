import './RegistrationPage.css';
import InputFieldItem from "../InputFieldItem/InputFieldItem";
import validateRegistrationForm from './validateRegistrationForm';
import { Link } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import SubmitButton from "../SubmitButton/SubmitButton";
import ProfilePicDisplay from "./ProfilePicDisplay/ProfilePicDisplay";
import { useNavigate } from "react-router-dom";
import userDatabase from "../userArray";

function RegistrationPage({ setDB, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [displayname, setDisplayName] = useState("");
    const [picture, setPicture] = useState("");
    const navigate = useNavigate();

    /*const usernameRef = useRef(null);
    const passwordRef = useRef(null);*/

    const [errors, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validateRegistrationForm({ username, password, verify, displayname, picture });

        setError(newErrors);

        // authenticate username and password
        if (newErrors.length === 0) {
            let newUser = userDatabase.addUser({username, password, displayname, picture});
            setUser(newUser);
            navigate('/', { state: { username } });

            // setLoggedIn(true);
            // setUsername("");
            // setPassword("");
            // usernameRef.current.focus();
        } /*else {
            passwordRef.current.focus();
        }*/
    }

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
        <form className="register-card" onSubmit={handleSubmit}>
            <h1>
                Register
            </h1>
            {/* Input field for username */}
            <InputFieldItem title={"Username"} type={"text"} id={"username-input"} placeholder={"Enter username"} />
            {/* Input field for password */}
            <InputFieldItem title={"Password"} type={"password"} id={"password-input"} placeholder={"Enter password"}/>
            {/* Input field for password confirmation */}
            <InputFieldItem title={"Verify password"} type={"password"} id={"conf-pass-input"} placeholder={"Reenter password"}/>
            {/* Input field for display name */}
            <InputFieldItem title={"Display name"} type={"text"} id={"displayname-input"} placeholder={"Enter display name"}/>
            {/* Input field for uploading profile picture */}
            <InputFieldItem title={"Picture"} type={"file"} id={"upload-picture-input"} placeholder={""}
                            handleChange={handleFileUpload} />
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