import {client} from "../database/redisClient.ts";
import IChatroom from "../../../public/types/IChatroom.ts";

export const getChatrooms = async (roomId?: number | string): Promise<IChatroom | IChatroom[]> => {
    try {
        const chatroomsData = await client.sMembers("chatrooms");
        const chatrooms: IChatroom[] = chatroomsData.map((room) => JSON.parse(room));
        const chatroom: IChatroom | undefined = chatrooms.find((room) => room.roomId == roomId);

        return roomId ? (chatroom as IChatroom) : chatrooms;
    } catch (e) {
        throw e;
    }
};
