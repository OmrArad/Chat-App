import userDatabase from "../../user_db";

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
    }
    
    console.log("errors: " + newErrors);
    return {newErrors, hasError};
}

export default validateLoginForm;