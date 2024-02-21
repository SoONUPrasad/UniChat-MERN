import express from 'express';
import connectDB from './db/connection.js';
import userRoutes from './routes/user.routes.js';
import messageRoutes from './routes/message.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

const app = express();
connectDB();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// routes
app.use('/api', userRoutes)
app.use('/api', messageRoutes)


export default app;