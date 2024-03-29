import mongoose from 'mongoose'
import User from './user.js'
import Inc from 'mongoose-sequence'

// const autoIncrement = Inc(mongoose);

// Define the Message schema
const MessageSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    sender: {
        type: User.schema,
        required: true,
    },
    content: {
        type: String,
        nullable: true,
    },
});

// Message.plugin(autoIncrement, { id: 'message_id', inc_field: 'id' });

const Message = mongoose.model('Message', MessageSchema);

export default Message;