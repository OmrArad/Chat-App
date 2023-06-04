import Message from '../model/message.js'
import Users from '../services/users.js'

const addMessage = async (sender, msg) => {
    // Increment the id for each new chat
    const lastMessage = await Message.findOne().sort({ id: -1 });
    const messageId = lastMessage ? lastMessage.id + 1 : 0;
    const user = await Users.fetchUserDetails(sender);

    const newMessage = new Message({
        id: messageId,
        created: Date.now(),
        sender: user,
        content: msg
    });

    const didSave = await newMessage.save();
    console.log(didSave);
    return newMessage;
}

const getMessageJson = (msg) => {
    return {
        id: msg.id,
        created: msg.created,
        sender: { username: msg.sender.username },
        content: msg.content
    };
}

export default { addMessage, getMessageJson };