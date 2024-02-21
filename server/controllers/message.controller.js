import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js"

const sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user.id
        // console.log(senderId);
        if (!receiverId || !message) throw new Error("all fields required");

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] }, });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = await Message.create({
            message,
            senderId,
            receiverId
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
            conversation.save();
        }
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    sendMessage
}