import express from "express";
import ViteExpress from "vite-express";
import {createChatRouter} from "./routers/create_chat.ts";

import dotenv from "dotenv";
dotenv.config();

import {client} from "./database/redisClient.ts";

import cors from "cors";

export const app = express();
const PORT: number = Number(process.env.PORT);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/createchat", createChatRouter);

app.get("/", (req, res) => {
    res.redirect("/jatty/home");
});

// connect to redis client
// await client.connect();

// start the server
// ViteExpress.listen(app, PORT, async () => {
//     try {
//         console.log(`Server listening @ http://localhost:${PORT}`);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         console.log("database nd server running");
//     }
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
