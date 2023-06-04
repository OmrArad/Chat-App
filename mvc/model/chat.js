import mongoose from 'mongoose'
import User from './user.js'
import Message from './message.js'


// const autoIncrement = Inc(mongoose);

// Define the Chat schema
const ChatSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    users:
    {
        type: [User.schema],
        nullable: true,
    },
    messages:
    {
        type: [Message.schema],
        nullable: true,
    },
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;