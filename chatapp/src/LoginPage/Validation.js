const Validation = (values) => {
    let errors = {}

    if(!values.username) {
        errors.username = "Username Required"
    
    }
    else if (values.username.length < 5) {
        errors.username = "Name must be more than 5 chars"
    }

    if(!values.password) {
        errors.password = "Password Required"
    }
    else if (values.password.length < 8) {
        errors.password = "Password must be more than 8 chars"
    }

    return errors;
}

export default Validation;