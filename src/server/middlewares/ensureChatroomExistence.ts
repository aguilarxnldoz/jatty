import {Request, Response, NextFunction} from "express";
import {client} from "../database/redisClient.ts";

export const ensureChatroomExistence = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {roomId} = req.params;
        if (!roomId) return res.status(400).json({success: false});
        const chatroomList = await client.sMembers("chatrooms");
        const chatrooms = chatroomList.map((room) => JSON.parse(room));
        const match = chatrooms.find((room) => String(room.roomId) === roomId);

        console.log(`ROOM ID FROM MIDDLWARE: ${roomId}`);

        if (!match) {
            return res.status(404).json({success: false});
        }
        next();
    } catch (e) {
        return res.status(500).json({success: false});
    }
};
