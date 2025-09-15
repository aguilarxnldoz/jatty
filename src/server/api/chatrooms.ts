import express from "express";
import {client} from "../database/redisClient.ts";
export const chatroomsApi = express.Router();

/* "/api/chatrooms" */
// returns a list of open chatrooms in the database

chatroomsApi.get("/", async (req, res) => {
    try {
        let chatroomsData = await client.sMembers("chatrooms");
        if (!chatroomsData) return res.status(200).json({success: true, message: "No chats currently available..."});

        console.log(chatroomsData);

        const chatrooms = chatroomsData.map((chatroom) => {
            return JSON.parse(chatroom);
        });

        console.log(chatrooms);
        return res.status(200).json({success: true, chatrooms: chatrooms});
    } catch (e) {
        console.error(`Failed to obtain chatrooms ${e}`);
        return res.status(500).json({sucecss: false, data: null});
    }
});
