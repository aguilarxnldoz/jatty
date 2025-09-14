import express from "express";
import {client} from "../database/redisClient.ts";
import {ensureChatroomExistence} from "../middlewares/ensureChatroomExistence.ts";
export const chatroomRouter = express.Router();

/* "/jatty/chatroom/:roomId" */
chatroomRouter.get("/:roomId", ensureChatroomExistence, async (req, res, next) => {
    try {
        next();
    } catch (e) {
        console.error("Server Error: ", e);
        return res.status(500).json({success: false, message: "Server Error"});
    }
});
