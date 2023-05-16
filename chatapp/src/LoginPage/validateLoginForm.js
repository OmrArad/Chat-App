import userDatabase from "../user_db";

function validateLoginForm(values) {
    const newErrors = {};
    let hasError = false;
    
    // Check for password
    if(values.password === '') {
        newErrors.password = "Password required"
        hasError = true;
    }

    // Validate username
    if (!values.username) {
        newErrors.username = "Username required";
        hasError = true;
    } else if (!userDatabase.containsUser(values.username)) {
        newErrors.username = "User " + values.username + " does not exist";
        hasError = true;
    } else {

        // check that given password is the same as user's
        let user = userDatabase.getUser(values.username);
        if (user.password !== values.password) {
            newErrors.password = "Password is incorrect"
            hasError = true;
        }
    }
    console.log("errors: " + newErrors);
    return {newErrors, hasError};
}

export default validateLoginForm;