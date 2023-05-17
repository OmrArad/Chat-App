// import exp from 'constants';
// import LogoutButton from './LeftColumn/LeftColumn';
// import AddContact from './SearchAndAddAcountItems/AddItem.js';



// function LeftColumn({  }) {

//     const [contacts, setContacts] = useState([]);

//     return (
//         <div className="col-md-3">
//             <div className="card" id="chat-card" style={{ height: "80%" }}>
//                 <span className="d-flex flex-column mb-3">
//                     <LogoutButton />

//                     <h3 className="text-center">Chats</h3>
//                     <AddContact setContacts={setContacts} />
//                     <img
//                         src={user.user.picture}
//                         className="rounded-circle mb-3"
//                         alt="Your Image"
//                         width="50"
//                         height="50"
//                         style={{ display: 'block', margin: 'auto' }}
//                     />
//                 </span>
//                 {/* <SearchItem doSearch={doSearch} /> */}
//                 <ul className="list list-group">
//                     <UserPanel
//                         contacts={contacts}
//                         setSelectedUser={setSelectedUser}
//                         setMessages={setMessages}
//                         messages={messages}
//                     />
//                 </ul>
//             </div>
//         </div>
//     );

// }

// export default LeftColumn