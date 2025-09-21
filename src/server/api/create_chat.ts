import express from "express";
import {randomRoomNumberGenerator} from "../logic/room_number_generator.ts";
import {client} from "../database/redisClient.ts";
import {Chatroom} from "../logic/chatroom.ts";

export const createChatApi = express.Router();

/* "/api/createchat" */
// recieves user/chatroom information and saves to the redis database.

createChatApi.post("/", async (req, res) => {
    try {
        const {username, chatroomName} = req.body;
        if (!chatroomName || !username) return res.status(400).json({success: false, message: "Invalid room details"});

        let roomId = await randomRoomNumberGenerator();
        const newChatroom = new Chatroom(roomId, chatroomName);

        // save the roomId and room name in the database.
        console.log("Saving room ID to database...");
        await client.sAdd("chatrooms", JSON.stringify(newChatroom.chatroomDetails));
        console.log("Successfully saved room ID to redis");

        res.status(200).json({success: true, roomId: roomId});
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false, errorMessage: e});
    }
});
