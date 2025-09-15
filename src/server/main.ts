/* Server Imports */
import express from "express";
import ViteExpress from "vite-express";
import {createServer} from "http";
import {Server} from "socket.io";

/* Router/API imports */
import {createChatApi} from "./api/create_chat.ts";
import {chatroomsApi} from "./api/chatrooms.ts";
import {chatroomRouter} from "./api/chatroom.ts";

/* back-end typeshi imports */
import dotenv from "dotenv";
dotenv.config();
import {client} from "./database/redisClient.ts";
import cors from "cors";

export const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

/* Middlewares nd shi */
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// API endpoints
app.use("/api/createchat", createChatApi);
app.use("/api/chatrooms", chatroomsApi);

// page endpoints
app.use("/jatty/chatroom", chatroomRouter);

// --------------------------------------------------------
app.get("/", (req, res) => res.redirect("/jatty/home"));
app.get("/jatty", (req, res) => res.redirect("/jatty/home"));

/* 💀 trying to integrate socket.io here */

// const httpServer = createServer(app);
// ViteExpress.bind(app, httpServer);

// const io = new Server(httpServer, {
//     serveClient: false,
//     pingInterval: 10000,
//     cookie: false,
// });

const startServer = async () => {
    try {
        await client.connect();
        console.log("Redis Client connected");
        ViteExpress.listen(app, PORT, () => {
            console.log(`Server listening @ http://localhost:${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
};

startServer();
