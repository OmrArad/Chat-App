const UserPass = require('../model/userPass')
import { findByUsername } from "./userNamePass.js";

const getUserPass = (username) => {
    let userNP;
    try {
        userNP = findByUsername(username);
    } catch (error) {
        throw new Error(error.message);
    }

    return new UserPass({
        username:userNP.username,
        password:userNP.password
    });
}

export {
    getUserPass
}