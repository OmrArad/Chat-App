import mongoose from 'mongoose'
import User from './user.js'
import Message from './message.js'
import Inc from 'mongoose-sequence'

const autoIncrement = Inc(mongoose);


// Define the Chat schema
const Chat = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    users: {
        type: [User.schema],
        nullable: true,
    },
    messages: {
        type: [Message.schema],
        nullable: true,
    },
});

Chat.plugin(autoIncrement, { id: 'chat_id', inc_field: 'id' });

export default mongoose.model('Chat', Chat);