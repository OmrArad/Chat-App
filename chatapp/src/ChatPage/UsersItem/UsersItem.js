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
  
  return (
    data.map((item, index) => {
      return (
        <li className="list-group-item" key={index} onClick={() => {
          console.log('You clicked on', item.name);
        }}>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <img src={item.pic} className="rounded-circle me-3" alt="Your Image" width="50" height="50"></img>
              <div className="d-flex flex-column">
                <h5 className="mb-0">{item.name}</h5>
                <p className="mb-0">{item.message}</p>
              </div>
            </div>
            <div className="d-flex flex-column">
              <p className="mb-0">{item.time}</p>
              <span className="badge bg-primary">1</span>
            </div>
          </div>
        </li>
      )
    })
  );
  }
  export default UserComponent;