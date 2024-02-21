import { verifyRefreshToken, verifyToken } from '../utils/JwtAuth.js';

const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "No token provided" });
        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ error: "No token provided" });
        const payload = verifyToken(token);
        if (!payload) return res.status(401).json({ error: "Invalid token" });
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

const authUser = (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        const accessToken = req.cookies?.accessToken;
        if (!refreshToken || !accessToken) return res.status(401).json({ error: "No token provided" });
        const user = verifyRefreshToken(refreshToken) || verifyToken(accessToken);
        if (!user) return res.status(401).json({ error: "Invalid token" });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}

export {
    checkAuth,
    authUser
}