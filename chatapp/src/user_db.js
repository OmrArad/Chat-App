import p1 from './ChatPage/ContactItem/profile_pics/p1.png'

/*
List of users with each user object having the following format:
{
    "username": "#username#",
    "password": "#password#",
    "display-name": "#display name#",
    "picture": #image object#
}
 */
const userList = [
    {
        "username": "user1",
        "password": "12345678",
        "display-name": "Hemi Horowitz",
        "picture": p1
    }
];


const userDatabase = {

    // returns if user with given username exists in the database
    containsUser(username) {
        for (let user of userList) {
            if (user.username === username) {
                return true; // user exists
            }
        }
        return false; // user doesn't exist
    },

    // creates new user, adds it to the database and then returns it to the caller
    addUser({username, password, displayName, picture}) {
        let newUser = {
            "username": username,
            "password": password,
            "display-name": displayName,
            "picture": picture
        }
        userList.push(newUser);
        return newUser;
    },

    // returns user with given username if it exists in the database, otherwise returns undefined
    getUser(username) {
        for (let user of userList) {
            if (user.username === username) {
                return user;
            }
        }
        return undefined;
    },
};

export default userDatabase;