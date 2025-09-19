/* Server Imports */
import express from "express";
import ViteExpress from "vite-express";
import {createServer} from "node:http";
import {Server} from "socket.io";

/* Router/API imports */
import {createChatApi} from "./api/create_chat.ts";
import {chatroomsApi} from "./api/chatrooms.ts";
import {chatroomRouter} from "./api/chatroom.ts";
import {chatroomDataRouter} from "./api/chatroom_data.ts";

/* back-end typeshi imports */
import dotenv from "dotenv";
dotenv.config();
import {client} from "./database/redisClient.ts";
import cors from "cors";

const PORT: number = Number(process.env.PORT) || 3000;
const app = express();
const server = createServer(app);

export const io = new Server(server, {
    cors: {
        origin: process.env.VITE_CLIENT_ORIGIN,
        methods: ["GET", "POST"],
    },
});

// makes sure that socket-io integrates with vite-express lib
ViteExpress.bind(app, server);

/* Middlewares nd shi */
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// API endpoints
app.use("/api/createchat", createChatApi);
app.use("/api/chatrooms", chatroomsApi);
app.use("/api/chatroomdata", chatroomDataRouter);

// page endpoints
app.use("/jatty/chatroom", chatroomRouter);

// --------------------------------------------------------
app.get("/", (req, res) => res.redirect("/jatty/home"));
app.get("/jatty", (req, res) => res.redirect("/jatty/home"));

const startServer = async () => {
    try {
        await client.connect();
        console.log("Redis Client connected");

        server.listen(PORT, () => {
            console.log(`Server listening @ http://localhost:${PORT}`);
        });

        // socket.IO logic
        io.on("connection", (socket) => {
            console.log("user has loaded into home", socket.id);

            socket.on("room-joined", (data) => {
                console.log(data.message);
            });

            socket.on("sent-message", (data) => {
                console.log(data);
                const {roomId, message} = data;
                console.log(`🔥Incoming message from ${socket.id} from chatroom: ${roomId}`);
                console.log(`🤰🏿 ${socket.id} has sent: ${message}`);
            });

            socket.on("disconnect", (reason) => {
                console.log("user has disconnected", reason);
            });
        });
    } catch (e) {
        console.error(e);
    }
};

startServer();
