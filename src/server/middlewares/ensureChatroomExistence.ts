import {Request, Response, NextFunction} from "express";
import {client} from "../database/redisClient.ts";
import {getChatrooms} from "../logic/getChatrooms.ts";
import IChatroom from "../../../public/types/IChatroom.ts";

export const ensureChatroomExistence = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {roomId} = req.params;
        if (!roomId) return res.status(400).json({success: false});

        const chatroom = await getChatrooms(roomId);
        console.log(`ROOM ID FROM MIDDLWARE: ${(chatroom as IChatroom).roomId}`);

        if (!chatroom) {
            return res.status(404).json({success: false});
        }
        next();
    } catch (e) {
        return res.status(500).json({success: false});
    }
};
