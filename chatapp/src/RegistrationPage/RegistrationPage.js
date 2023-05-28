import './RegistrationPage.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import validateRegistrationForm from "./validateRegistrationForm";
import InputFieldItem from '../InputFieldItem/InputFieldItem';
import { Link } from 'react-router-dom';
import SubmitButton from "./SubmitButton/SubmitButton";
import ProfilePicDisplay from "./ProfilePicDisplay/ProfilePicDisplay";

// Define the logic of the registration form
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
        'username': '',
        'password': '',
        'validate': '',
        'displayName': '',
        'picture': ''
    });

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

    // flag to track whether form has errors
    let errorCondition = false;

    // function to handle form submission
    const handleSubmit = e => {
        e.preventDefault();

        // validate form input and update errors state variable
        const validationResult = validateRegistrationForm({ username, password, verify, displayname, picture: picture_obj });
        errorCondition = validationResult.hasError;
        setError(validationResult.newErrors);

        // if there are no errors, add user to database and navigate to login page
        if (errorCondition === false) {
            const data = { username, password, displayName: displayname, profilePic: profilePicPath }
            handleRegister(data)
        }
    };

    // function to handle user registration
    async function handleRegister(data) {

        const res = await fetch('http://localhost:5000/api/Users', {
            'method': 'post',
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': JSON.stringify(data)
        })

        if (res.status == 409) {
            existingUserError()
        }
        else if (res.status != 200)
            alert('Something went wrong') // if this case arises it will be added to conditions
        else {
            // Successful registration
            // Navigate to login page
            navigate('/login');
            alert("Registration successful")
        }
    };

    function existingUserError() {
        const newErrors = {}
        newErrors.username = "User already exists, please choose a different username";
        setError(newErrors)
        alert('User already exists, please choose a different username')
        errorCondition = true;
    }

    return (
        /* Registration form */
        <form className="register-card">
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
                            handleBlur={handleDisplayNameChange} error={errors.displayName}/>
            {/* Input field for uploading profile picture */}
            <InputFieldItem title={"Picture"} type={"file"} id={"upload-picture-input"} placeholder={""}
                handleChange={handlePictureUpload} error={errors.picture} />
            {/* Display uploaded image */}
            <ProfilePicDisplay path={profilePicPath} />
            {/* Button for registration submission */}
            <div id="register-row" className="row">
                <SubmitButton title={"Register"} type={"submit"} id={"register-button"} onSubmit={handleSubmit} />
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