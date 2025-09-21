import {client} from "../database/redisClient.ts";

const MAX_VALUE = 9999;
const MIN_VALUE = 1000;

const getRandomFourDigitNumber = (): number => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);

export const randomRoomNumberGenerator = async (): Promise<number> => {
    while (true) {
        const candidate = getRandomFourDigitNumber();
        const exists = await client.sIsMember("chatrooms", `room:${candidate}`);
        if (exists === 0) return candidate;
    }
};
