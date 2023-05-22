import './RegistrationPage.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userDatabase from "../user_db";
import validateRegistrationForm from "./validateRegistrationForm";
import RegistrationForm from './RegistrationForm';

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
        <RegistrationForm
            handleSubmit={handleSubmit}
            setUsername={setUsername}
            setPassword={setPassword}
            setVerify={setVerify}
            setDisplayName={setDisplayName}
            setPicture_obj={setPicture_obj}
            profilePicPath={profilePicPath}
            setProfilePicPath={setProfilePicPath}
            errors={errors}
        />
    );
}

export default RegistrationPage;