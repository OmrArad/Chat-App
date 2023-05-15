import './RegistrationPage.css';
import InputFieldItem from "../InputFieldItem/InputFieldItem";
import { Link } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import SubmitButton from "../SubmitButton/SubmitButton";
import ProfilePicDisplay from "./ProfilePicDisplay/ProfilePicDisplay";
import { useNavigate } from "react-router-dom";
import userDatabase from "../userArray";

function RegistrationPage({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [displayname, setDisplayName] = useState("");
    const [picture, setPicture] = useState("");
    const navigate = useNavigate();
    const [profilePicPath, setProfilePicPath] = useState("");

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleVerifyChange(e) {
        setVerify(e.target.value);
    }
    function handleDisplayNameChange(e) {
        setDisplayName(e.target.value);
    }


    const [errors, setError] = useState(null);
    const [errorCondition, setErrorCondition] = useState(false);

    function validateRegistrationForm(values) {
        const newErrors = {};

        console.log(values)

        if(values.username === undefined) {
            newErrors.username = "Username required";
            setErrorCondition(true);
        }
        else if (values.username.length < 5) {
            newErrors.username = "Name must contain at least 5 characters";
            setErrorCondition(true);
        }

        if(values.password === undefined) {
            newErrors.password = "Password required"
            setErrorCondition(true);
        }
        else if (values.password.length < 8) {
            newErrors.password = "Password must contain 8 characters"
            setErrorCondition(true);
        }

        if(values.verify === undefined) {
            newErrors.verify = "Please verify password"
            setErrorCondition(true);
        }
        else if (values.password !== values.verify) {
            newErrors.verify = "Given passwords do not match"
            setErrorCondition(true);
        }

        if(values.displayname === undefined) {
            newErrors.displayname = "Display name required"
            setErrorCondition(true);
        }

        if(values.profilePicPath === undefined) {
            newErrors.picture = "Picture required"
        }

        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = validateRegistrationForm({ username, password, verify, displayname, profilePicPath });

        setError(newErrors);

        // authenticate username and password
        if (errorCondition === false) {
            let newUser = userDatabase.addUser({username, password, displayname, "picture":{profilePicPath}});
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
            <InputFieldItem title={"Username"} type={"text"} id={"username-input"} placeholder={"Enter username"}
                            handleChange={handleUsernameChange} error={errors.username} />
            {/* Input field for password */}
            <InputFieldItem title={"Password"} type={"password"} id={"password-input"} placeholder={"Enter password"}
                            handleChange={handlePasswordChange} error={errors.password} />
            {/* Input field for password confirmation */}
            <InputFieldItem title={"Verify password"} type={"password"} id={"conf-pass-input"} placeholder={"Reenter password"}
                            handleChange={handleVerifyChange} error={errors.verify} />
            {/* Input field for display name */}
            <InputFieldItem title={"Display name"} type={"text"} id={"displayname-input"} placeholder={"Enter display name"}
                            handleChange={handleDisplayNameChange} error={errors.displayname}/>
            {/* Input field for uploading profile picture */}
            <InputFieldItem title={"Picture"} type={"file"} id={"upload-picture-input"} placeholder={""}
                            handleChange={handleFileUpload} error={errors.picture} />
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