// mock data to store in the db

import {client} from "./redisClient.ts";

const MOCK_DATA = {
    roomId: 0o00,
    chatroomName: "🍔",
};

const setMockData = async () => {
    await client.connect();
    await client.sAdd("chatrooms", JSON.stringify(MOCK_DATA));
};

setMockData();
