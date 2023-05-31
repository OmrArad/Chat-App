import { getUserChats } from "../services/chat.js";

function chat(req, res) {
  if (req.headers.authorization) {
    // Retrieve user chats based on the authorization header
    // fetch the user name from the authorization header
    let username = req.headers.authorization.split(" ")[1]; //????
    let chats = getUserChats(req.headers.authorization);
    if (chats != null) {
      if (req.method === "GET") {
        // Return all chats
        res.status(200).json(chats);
      } else if (req.method === "POST") {
        // Create a new chat
        const newChat = req.body; // Assuming the request body contains the chat data
        chats.push(newChat);
        res.status(200).json(newChat);
      } else {
        res.status(405).send("Method Not Allowed");
      }
    } else {
      res.status(404).send("Invalid username and/or password");
    }
  } else {
    res.redirect("/login");
  }
}

export default chat;
