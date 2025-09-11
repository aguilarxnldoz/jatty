import express from "express";
import {randomRoomNumberGenerator} from "../room_number_generator.ts";
import {client} from "../database/redisClient.ts";

export const createChatApi = express.Router();

createChatApi.post("/", async (req, res) => {
    try {
        const {username, chatVisibility} = req.body;
        if (!chatVisibility || !username) return res.status(400).json({success: false, message: "Invalid room details"});

        // lazy way of making a random 4 digit room id
        const roomId = randomRoomNumberGenerator(1000, 9999);

        console.log("Saving room ID to database...");
        await client.sAdd("chatrooms", `room:${roomId}`);
        console.log("Successfully saved room ID to redis");

        res.status(200).json({success: true, roomId: roomId});
    } catch (e) {
        console.error(e);
        res.status(500).json({success: false, errorMessage: e});
    }
});
