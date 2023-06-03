import UserPass from '../model/userNamePass.js';
import login from './login.js'

// Find a UserPass by username
const findByUsername = async (username) => {
    try {
        return await UserPass.findOne({ username });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Generate token if user exist and password is valid
const getUserToLogin = async (username, password) => {
    try {
        const user = await findByUsername(username);
        if (!user || user.password !== password) {
            throw new Error('Invalid username and/or password');
        }
        const token = await login.tokenizer(user.username);
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default { getUserToLogin };