import express from "express";
import {getChatrooms} from "../logic/getChatrooms.ts";
export const chatroomDataRouter = express.Router();

chatroomDataRouter.post("/", async (req, res) => {
    try {
        const {roomId} = req.body;
        const chatroom = await getChatrooms(roomId);
        return res.status(200).json({success: true, chatroomData: chatroom});
    } catch (e) {
        console.error("Server Error: ", e);
        res.status(500).json({success: false, message: e});
    }
});
