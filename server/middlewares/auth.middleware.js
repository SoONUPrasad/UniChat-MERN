import { verifyRefreshToken, verifyToken } from '../utils/JwtAuth.js';

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });
    verifyToken(token)
     .then(user => {
            req.user = user;
            next();
        })
     .catch(err => {
            res.status(401).json({ error: "Invalid token" });
        });
}

const authUser = async (req, res, next) => {
    const token = req.cookies?.refreshToken;
    // console.log(token);
    if (!token) return res.status(401).json({ error: "No token provided" });
    const user = verifyRefreshToken(token);
    if (!user) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
}

export {
    checkAuth,
    authUser
}