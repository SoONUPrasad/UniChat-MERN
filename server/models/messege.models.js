import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const Message = mongoose.model('Message', messagesSchema);

export default Message;