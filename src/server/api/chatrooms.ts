import express from "express";
import {client} from "../database/redisClient.ts";
import {getChatrooms} from "../logic/getChatrooms.ts";
export const chatroomsApi = express.Router();

/* "/api/chatrooms" */
// returns a list of open chatrooms in the database

chatroomsApi.get("/", async (req, res) => {
    try {
        const chatrooms = await getChatrooms();
        console.log(chatrooms);
        return res.status(200).json({success: true, chatrooms: chatrooms});
    } catch (e) {
        console.error(`Failed to obtain chatrooms ${e}`);
        return res.status(500).json({sucecss: false, data: null});
    }
});
