import express from "express";
import ViteExpress from "vite-express";
import {createChatApi} from "./api/create_chat.ts";
import {chatroomsApi} from "./api/chatrooms.ts";
import {chatroomRouter} from "./api/chatroom.ts";

import dotenv from "dotenv";
dotenv.config();

import {client} from "./database/redisClient.ts";

import cors from "cors";

export const app = express();
const PORT: number = Number(process.env.PORT);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// API endpoints
app.use("/api/createchat", createChatApi);
app.use("/api/chatrooms", chatroomsApi);

// page endpoints
app.use("/jatty/chatroom", chatroomRouter);

// --------------------------------------------------------
app.get("/", (req, res) => {
    res.redirect("/jatty/home");
});

app.get("/jatty", (req, res) => {
    res.redirect("/jatty/home");
});

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
