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
});

userSchema.pre('save', async function (next) {
    const user = this;
    const salt = randomBytes(16).toString("hex");
    const hashPassword = createHmac("sha256", salt).update(user.password).digest("hex");
    user.salt = salt;
    user.password = hashPassword;
    next();
})

userSchema.static("UserMatch", async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const hashPassword = createHmac("sha256", user.salt).update(password).digest("hex");
    if (hashPassword !== user.password) throw new Error("Incorrect Password");
    const token = createToken(user);
    const refreshToken = createRefreshToken(user);
    const tokens = {
        "AccessToken": token,
        "RefreshToken": refreshToken
    };
    return tokens;
})

const User = mongoose.model("User", userSchema);

export default User;