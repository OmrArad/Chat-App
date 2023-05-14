import p1 from './ChatPage/ContactItem/profile_pics/p1.png'

    const userArray = [
        {
            "username": "user1",
            "password": "12345678",
            "display-name": "Hemi Horowitz",
            "picture": p1
        }
    ];


const userDatabase = {
    containsUser(username) {
        for (let user of userArray) {
            if (user.username === username) {
                return true;
            }
        }
        return false;
    },

    addUser({username, password, displayName, picture}) {
        let newUser = {
            "username": username,
            "password": password,
            "display-name": displayName,
            "picture": picture
        }
        userArray.push(newUser);
        console.log(userArray);
        return newUser;
    },

    getUser(username) {
        for (let user of userArray) {
            if (user.username === username) {
                return user;
            }
        }
        return undefined;
    },
};

export default userDatabase;