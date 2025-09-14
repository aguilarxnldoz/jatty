import express from "express";
import {client} from "../database/redisClient.ts";
import {ensureChatroomExistence} from "../middlewares/ensureChatroomExistence.ts";
export const chatroomsApi = express.Router();

/* "/api/chatrooms*/
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

/* "/api/chatrooms/:roomId" */
chatroomsApi.get("/:roomId", ensureChatroomExistence, async (req, res) => {
    try {
        const {roomId} = req.params;
        return res.status(200).json({success: true, roomId: roomId});
    } catch (e) {
        return res.status(500).json({success: false});
    }
});
