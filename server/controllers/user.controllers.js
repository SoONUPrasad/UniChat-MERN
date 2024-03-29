import User from "../models/user.models.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) throw new Error("all fields required");
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).json({ error: "User already exists" });
        const newUser = await User.create({
            name,
            email,
            password
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("all fields required");
        const tokens = await User.UserMatch(email, password);
        // console.log(tokens);
        if (!tokens) throw new Error("Invalid password");
        res.status(200).cookie("accessToken", tokens.accessToken).cookie("refreshToken", tokens.refreshToken).json({ "message": "Login successful", tokens })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const logInUsers = req.user.id; 
        const users = await User.find({_id: {$ne: logInUsers}}).select(["-password", "-salt"]);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    createUser,
    loginUser,
    getAllUsers
}