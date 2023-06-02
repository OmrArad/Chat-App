import UserPass from '../model/userNamePass.js';
import login from './login.js'

// Create a new UserPassName
const comparePassword = async (password) => {
    // Check if a user with the given username already exists
    const existingUser = await UserPass.findOne({ password });
    if (existingUser && existingUser.password == password) {
        try {
            return await login.tokenizer(existingUser.username);
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        throw new Error("User Was not found");
    }
    
};

export default { comparePassword };