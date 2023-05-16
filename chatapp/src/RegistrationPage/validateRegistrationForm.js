const validateRegistrationForm = (values) => {
    let errors = {}

    if(!values.username) {
        errors.username = "Username required"
    }
    else if (values.username.length < 5) {
        errors.username = "Name must contain at least 5 characters"
    }

    if(!values.password) {
        errors.password = "Password required"
    }
    else if (values.password.length < 8) {
        errors.password = "Password must contain 8 characters"
    }

    if(!values.verify) {
        errors.verify = "Please verify password"
    }
    else if (values.password !== values.verify) {
        errors.verify = "Given passwords do not match"
    }

    if(!values.displayname) {
        errors.displayname = "Display name required"
    }

    if(!values.picture) {
        errors.picture = "Picture required"
    }

    return errors;
}

export default validateRegistrationForm;