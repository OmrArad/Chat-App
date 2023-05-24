function validateRegistrationForm(values) {
    const newErrors = {};

    let hasError = false;

    // Validate username
    if(values.username === '') {
        newErrors.username = "Username required";
        hasError = true;
    }
    else if (values.username.length < 5) {
        newErrors.username = "Name must contain at least 5 characters";
        hasError = true;
    } // User-Already-Exists case is handled in handleRegistration

    // Validate password
    if(values.password === '') {
        newErrors.password = "Password required"
        hasError = true;
    }
    else if (values.password.length < 8) {
        newErrors.password = "Password must contain 8 characters"
        hasError = true;
    }

    // Verify password
    if(values.verify === '') {
        newErrors.verify = "Please verify password"
        hasError = true;
    }
    else if (values.password !== values.verify) {
        newErrors.verify = "Given passwords do not match"
        hasError = true;
    }

    // Validate display name
    if(values.displayname === '') {
        newErrors.displayname = "Display name required"
        hasError = true;
    }

    // Validate picture
    if(values.picture === null) {
        newErrors.picture = "Picture required"
        hasError = true;
    } else if (values.picture.type.startsWith('image') === false) {
        newErrors.picture = "Given file is not an image"
        hasError = true;
    }

    return {newErrors, hasError};
}

export default validateRegistrationForm;