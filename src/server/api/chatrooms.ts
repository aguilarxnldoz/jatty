import express from "express";
import {client} from "../database/redisClient.ts";
export const chatroomsApi = express.Router();

chatroomsApi.get("/", async (req, res) => {
    try {
        let chatroomsData = await client.sMembers("chatrooms");
        if (!chatroomsData) return res.status(200).json({success: true, message: "No chats currently available..."});
        console.log(chatroomsData);

        // testing a way to find specific rooms out of the list (ignore);
        /* const chatroom = chatrooms.find((room) => room.includes("3983"));
        console.log(chatroom); */

        // parse the data
        const chatrooms = chatroomsData.map((room) => {
            return room.slice(-4, -1);
        });

        console.log(chatrooms);

        return res.status(200).json({success: true, chatrooms: chatrooms});
    } catch (e) {
        console.error(`Failed to obtain chatrooms ${e}`);
        return res.status(400).json({sucess: false, data: null});
    }
});
