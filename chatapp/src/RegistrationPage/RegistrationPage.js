import './RegistrationPage.css';
import InputFieldItem from "../InputFieldItem/InputFieldItem";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SubmitButton from "./SubmitButton/SubmitButton";
import ProfilePicDisplay from "./ProfilePicDisplay/ProfilePicDisplay";
import { useNavigate } from "react-router-dom";
import userDatabase from "../user_db";
import validateRegistrationForm from "./validateRegistrationForm";

function RegistrationPage() {

    // state variables to hold form input values and profile picture
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [displayname, setDisplayName] = useState("");
    const [picture_obj, setPicture_obj] = useState(null);
    const navigate = useNavigate();
    const [profilePicPath, setProfilePicPath] = useState("");

    // state variable and function to hold and update form validation errors
    const [errors, setError] = useState({
        'username':'',
        'password':'',
        'validate':'',
        'displayName':'',
        'picture':''
    });

    // flag to track whether form has errors
    let errorCondition = false;

    // event handlers to update state variables on input change
    const handleUsernameChange = e => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };
    const handleVerifyChange = e => {
        setVerify(e.target.value);
    };
    const handleDisplayNameChange = e => {
        setDisplayName(e.target.value);
    };

    // function to handle profile picture upload
    const handlePictureUpload = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const filePath = URL.createObjectURL(file);
            setPicture_obj(file)
            setProfilePicPath(filePath);
        }
    };

    // function to handle form submission
    const handleSubmit = e => {
        e.preventDefault();

        // validate form input and update errors state variable
        const validationResult = validateRegistrationForm({ username, password, verify, displayname, picture: picture_obj });
        errorCondition = validationResult.hasError;
        setError(validationResult.newErrors);

        // if there are no errors, add user to database and navigate to login page
        if (errorCondition === false) {
            userDatabase.addUser({username, password, displayName: displayname, picture: profilePicPath});

            // navigate to login page
            navigate('/login', {state: {username}});
            alert("Registration successful");
        }
    };


    return (
        /* Registration form */
        <form className="register-card" onSubmit={handleSubmit}>
            <h1>
                Register
            </h1>
            {/* Input field for username */}
            <InputFieldItem title={"Username"} type={"text"} id={"username-input"} placeholder={"Enter username"}
                            handleBlur={handleUsernameChange} error={errors.username} />
            {/* Input field for password */}
            <InputFieldItem title={"Password"} type={"password"} id={"password-input"} placeholder={"Enter password"}
                            handleBlur={handlePasswordChange} error={errors.password} />
            {/* Input field for password confirmation */}
            <InputFieldItem title={"Verify password"} type={"password"} id={"conf-pass-input"} placeholder={"Reenter password"}
                            handleBlur={handleVerifyChange} error={errors.verify} />
            {/* Input field for display name */}
            <InputFieldItem title={"Display name"} type={"text"} id={"displayname-input"} placeholder={"Enter display name"}
                            handleBlur={handleDisplayNameChange} error={errors.displayname}/>
            {/* Input field for uploading profile picture */}
            <InputFieldItem title={"Picture"} type={"file"} id={"upload-picture-input"} placeholder={""}
                            handleChange={handlePictureUpload} error={errors.picture} />
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