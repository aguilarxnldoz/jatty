import express from "express";
import {client} from "../database/redisClient.ts";

export const chatroomRouter = express.Router();

// bro ngl this is useless cuz if u try putting in ur own chat id nothing shows :)
chatroomRouter.get("/:roomId", async (req, res) => {
    try {
        const {roomId} = req.params;
        if (!roomId) return res.status(400).json({success: false, message: "Invalid room ID"});

        const chatroomsData = await client.sMembers("chatrooms");

        const chatrooms = chatroomsData.map((room) => JSON.parse(room));
        const match = chatrooms.find((room) => String(room.roomId) === roomId);

        if (!match) return res.status(404).json({success: false, message: "chatroom not found"});
        // res.json({success: true, chatroom: match});
        // return res.redirect(`/jatty/chatroom/${roomId}`);
    } catch (e) {
        console.error("Server Error: ", e);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});
