import express from "express";

export const chatroomRouter = express.Router();

chatroomRouter.get("/:roomId", (req, res) => {
    // redis code here to check if room exists

    const {roomId} = req.params;
    if (!roomId) return res.status(400).json({success: false, message: "Invalid room ID"});

    res.status(200).json({success: true});
});
