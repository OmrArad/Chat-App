
const UserComponent = () => {
    const data = [
      {
        name: 'Sapir Mosi',
        message: 'Hey!!!',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p1.png',
      },
      {
        name: 'Ido Moshe',
        message: 'Are you coming today?',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p5.png',
      },
      {
        name: 'Yoav Raz',
        message: 'What? No way!',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p3.png',
      },
      {
        name: 'Shira Dan',
        message: 'I love that song',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p1.png',
      },
      {
        name: 'Sara Paz',
        message: 'Are you going to the party?',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p2.png',
      },
      {
        name: 'Sapir Mosi',
        message: 'Hey!!!',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p4.png',
      },
      {
        name: 'Ido Moshe',
        message: 'Are you coming today?',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p5.png',
  
      },
      {
        name: 'Yoav Raz',
        message: 'What? No way!',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p3.png',
      },
      {
        name: 'Shira Dan',
        message: 'I love that song',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p1.png',
      },
      {
        name: 'Sara Paz',
        message: 'Are you going to the party?',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p2.png',
      },
      {
        name: 'Shira Dan',
        message: 'I love that song',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p1.png',
      },
      {
        name: 'Sara Paz',
        message: 'Are you going to the party?',
        time: '12/1/2023 16:45',
        pic: 'profile_pics/p2.png',
      }
    ];
}

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