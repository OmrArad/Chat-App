/*
List of users with each user object having the following format:
{
    "username": "#username#",
    "password": "#password#",
    "display-name": "#display name#",
    "picture": "#path/to/image#"
    "messages": #list of messages#
}
 */
const userList = [
    {
        "username": "user1",
        "password": "12345678",
        "display-name": "Hemi Horowitz",
        "picture": "profile_pics/p1.png",
        "messages": []
    }
];
const userDatabase = {
    containsUser(username) {
      for (let user of userList) {
        if (user.username === username) {
          return true; // user exists
        }
      }
      return false; // user doesn't exist
    },
  
    addUser({ username, password, displayName, picture }) {
      let newUser = {
        "username": username,
        "password": password,
        "display-name": displayName,
        "picture": picture,
        "messages": []
      };
      userList.push(newUser);
      return newUser;
    },
  
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
  