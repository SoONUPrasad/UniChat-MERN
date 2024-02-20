import Message from "../models/messege.models";

const sendMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        if (!id ||!message) throw new Error("all fields required");
        const conversation = await Message.findOne({ _id: id });
        if (!conversation) return res.status(404).json({ error: "Conversation not found" });
        const newMessage = await Message.create({
            message,
            conversation
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}