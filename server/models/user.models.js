import mongoose from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { createRefreshToken, createToken } from "../utils/JwtAuth.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    try {
        const user = this;
        const salt = randomBytes(16).toString("hex");
        const hashPassword = createHmac("sha256", salt).update(user.password).digest("hex");
        user.salt = salt;
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.static("UserMatch", async function (email, password) {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        const hashPassword = createHmac("sha256", user.salt).update(password).digest("hex");
        if (hashPassword !== user.password) throw new Error("Incorrect Password");
        const token = createToken(user);
        const refreshToken = createRefreshToken(user);
        const tokens = {
            "accessToken": token,
            "refreshToken": refreshToken
        };
        return tokens;
    } catch (error) {
        throw new Error("Invalid password");
    }
})

const User = mongoose.model("User", userSchema);

export default User;