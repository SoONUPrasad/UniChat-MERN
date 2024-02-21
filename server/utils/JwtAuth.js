import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN = process.env.REFRESH_KEY;

const createToken = (user) => {
    try {
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const token = JWT.sign(payload, SECRET_KEY, {
            expiresIn: "1h"
        })
        return token;
    } catch (error) {
        throw new Error(error);
    }
}

const createRefreshToken = (user) => {
    try {
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const token = JWT.sign(payload, REFRESH_TOKEN, {
            expiresIn: "1d"
        })
        return token;
    } catch (error) {
        throw new Error(error);
    }
}

const verifyToken = (id) => {
    try {
        return JWT.verify(id, SECRET_KEY);
    } catch (error) {
        throw new Error(error);
    }
}

const verifyRefreshToken = (token) => {
    try {
        const payload = JWT.verify(token, REFRESH_TOKEN);
        return payload;
    } catch (error) {
        throw new Error(error);
    }
}


export { createToken, createRefreshToken, verifyToken, verifyRefreshToken };