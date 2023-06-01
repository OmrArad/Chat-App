const jwt = require('jsonwebtoken');
const Chat = require('./models/Chat'); // Assuming you have a Chat model defined

function chat(req, res) {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = decodeToken(token);
    let chats = getUserChats(decodedToken.username);
    if (chats != null) {
      if (req.method === "GET") {
        // Return all chats
        res.status(200).json(chats);
      } else if (req.method === "POST") {
        // Create a new chat
        const newChat = req.body;
        const chat = new Chat(newChat);
        chat.save()
          .then(savedChat => {
            chats.push(savedChat);
            res.status(200).json(savedChat);
          })
          .catch(error => {
            res.status(500).json({ error: 'Failed to create chat' });
          });
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

function getMessagesById(req, res) {
  const chatId = req.params.chatId;
  Chat.findById(chatId)
    .then(chat => {
      if (chat) {
        res.status(200).json(chat.messages);
      } else {
        res.status(404).json({ error: 'Chat not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    });
}

function newMessageById(req, res) {
  const chatId = req.params.chatId;
  const message = req.body;
  Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: message } },
    { new: true }
  )
    .then(updatedChat => {
      if (updatedChat) {
        res.status(200).json(updatedChat);
      } else {
        res.status(404).json({ error: 'Chat not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to add new message' });
    });
}