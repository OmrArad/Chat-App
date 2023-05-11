import './RegistrationPage.css';
import Validation from '../LoginPage/Validation';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import ChatPage from '../ChatPage/ChatPage';
import { useNavigate } from "react-router-dom";

function RegisreationPage({ setDB }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [displayname, setDisplayName] = useState("");
    const [picture, setPicture] = useState("");
    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const [errors, setError] = useState({
        name: '',
        password: '',
        verify: '',
        displayName: '',
        picture: ''
    });

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = Validation({ username, password, verify, displayname, picture });

        setError(newErrors);

        // authenticate username and password
        if (!newErrors) {
            setDB({ username, password, displayname, picture });

            navigate('/', { state: { username } });

            // setLoggedIn(true);
            // setUsername("");
            // setPassword("");
            // usernameRef.current.focus();
        } else {
            passwordRef.current.focus();
        }
    };

    return (
        <>
            {/* Registration form */}
            <form className="register-card" onSubmit={handleSubmit}>
                {/*<div class="card-body">*/}
                {/* Input field for username */}
                <div id="username-row" className="form-label-group mb-3">
                    <label id="username-label" htmlFor="username-input">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username-input"
                        ref={usernameRef}
                        className="form-control form-floating"
                        placeholder="Enter username"
                        required=""
                    />
                </div>
                {/* Input field for password */}
                <div id="password-group" className="form-label-group mb-3">
                    <label
                        id="password-label"
                        htmlFor="password-input"
                        className="input-title col"
                    >
                        Password
                    </label>
                    <input
                        id="password-input"
                        type="password"
                        className="form-control form-floating"
                        placeholder="Enter password"
                        required=""
                    />
                </div>
                {/* Input field for password confirmation */}
                <div id="conf-pass-group" className="form-label-group mb-3">
                    <label
                        id="conf-pass"
                        htmlFor="conf-pass-input"
                        className="input-title col"
                    >
                        Verify Password
                    </label>
                    <input
                        id="conf-pass-input"
                        type="password"
                        className="form-control form-floating"
                        placeholder="Reenter password"
                        required=""
                    />
                </div>
                {/* Input field for display name */}
                <div id="displayname-row" className="form-label-group mb-3">
                    <label
                        id="displayname-label"
                        htmlFor="displayname-input"
                        className="input-title col"
                    >
                        Display name
                    </label>
                    <input
                        id="displayname-input"
                        type="text"
                        className="form-control form-floating"
                        placeholder="Enter display name"
                        required=""
                    />
                </div>
                {/* Input field for uploading profile picture */}
                <div id="upload-picture-row" className="form-label-group mb-3">
                    <label id="upload-picture-label" htmlFor="upload-picture-input">
                        Picture
                    </label>
                    <input
                        id="upload-picture-input"
                        type="file"
                        className="form-control form-floating"
                    />
                </div>
                {/* Div to display uploaded image */}
                <div id="image-row" className="row mb-3">
                    <img id="profile_img" src="fox.jpg" alt="placeholder pic" />
                </div>
                {/* Button for registration submission */}
                <div id="register-row" className="row">
                    <button type="submit" id="register-button" className="col-sm-3">
                        Register
                    </button>
                    {/* Link for already registered users to login */}
                    <div id="already-registered-txt" className="col text-sm-center">
                        Already registered?{" "}
                        <Link id="login-link" to='/login'>
                            Click here
                        </Link>{" "}
                        to login
                    </div>
                </div>
                {/*</div>*/}
            </form>
        </>

    );
}

export default RegisreationPage;