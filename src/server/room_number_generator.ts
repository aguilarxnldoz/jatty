import {client} from "./database/redisClient.ts";

const MAX_VALUE = 9999;
const MIN_VALUE = 1000;

const getRandomFourDigitNumber = (): number => Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE) + MIN_VALUE);

export const randomRoomNumberGenerator = async (): Promise<void> => {
    let potentialRoomId: number = getRandomFourDigitNumber();

    const roomIdExists: number = await client.sIsMember("chatrooms", `room:${potentialRoomId}`);
    const roomId: number = potentialRoomId;

    /*
		redis will return a 1 if the roomId already exists so run
		the function back until it can return a unique room id recursion typeshi
	*/
    roomIdExists === 1 ? randomRoomNumberGenerator() : roomId;
};
