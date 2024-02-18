import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN = process.env.REFRESH_KEY;

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    const token = JWT.sign(payload, SECRET_KEY, {
        expiresIn: "1m"
    })
    return token;
}

const createRefreshToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    const token = JWT.sign(payload, REFRESH_TOKEN, {
        expiresIn: "10m"
    })
    return token;
}

const verifyToken = (id) => {
    return JWT.verify(id, SECRET_KEY);
}

const verifyRefreshToken = (token) => {
    const payload = JWT.verify(token, REFRESH_TOKEN);
    return payload;
}


export { createToken, createRefreshToken, verifyToken, verifyRefreshToken };