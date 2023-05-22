import InputFieldItem from '../InputFieldItem/InputFieldItem';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import SubmitButton from "./SubmitButton/SubmitButton";
import ProfilePicDisplay from "./ProfilePicDisplay/ProfilePicDisplay";

function RegistrationForm(values) {

    // event handlers to update state variables on input change
    const handleUsernameChange = e => {
        values.setUsername(e.target.value);
    };
    const handlePasswordChange = e => {
        values.setPassword(e.target.value);
    };
    const handleVerifyChange = e => {
        values.setVerify(e.target.value);
    };
    const handleDisplayNameChange = e => {
        values.setDisplayName(e.target.value);
    };

    // function to handle profile picture upload
    const handlePictureUpload = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            const filePath = URL.createObjectURL(file);
            values.setPicture_obj(file)
            values.setProfilePicPath(filePath);
        }
    };

    return (
        /* Registration form */
        <form className="register-card">
            <h1>
                Register
            </h1>
            {/* Input field for username */}
            <InputFieldItem title={"Username"} type={"text"} id={"username-input"} placeholder={"Enter username"}
                handleBlur={handleUsernameChange} error={values.errors.username} />
            {/* Input field for password */}
            <InputFieldItem title={"Password"} type={"password"} id={"password-input"} placeholder={"Enter password"}
                handleBlur={handlePasswordChange} error={values.errors.password} />
            {/* Input field for password confirmation */}
            <InputFieldItem title={"Verify password"} type={"password"} id={"conf-pass-input"} placeholder={"Reenter password"}
                handleBlur={handleVerifyChange} error={values.errors.verify} />
            {/* Input field for display name */}
            <InputFieldItem title={"Display name"} type={"text"} id={"displayname-input"} placeholder={"Enter display name"}
                handleBlur={handleDisplayNameChange} error={values.errors.displayname} />
            {/* Input field for uploading profile picture */}
            <InputFieldItem title={"Picture"} type={"file"} id={"upload-picture-input"} placeholder={""}
                handleChange={handlePictureUpload} error={values.errors.picture} />
            {/* Display uploaded image */}
            <ProfilePicDisplay path={values.profilePicPath} />
            {/* Button for registration submission */}
            <div id="register-row" className="row">
                <SubmitButton title={"Register"} type={"submit"} id={"register-button"} onSubmit={values.handleSubmit}/>
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

export default RegistrationForm