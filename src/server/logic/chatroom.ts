export class Chatroom {
    private roomId: number;
    private chatroomName: string;

    constructor(_roomId: number, _chatroomName: string) {
        this.roomId = _roomId;
        this.chatroomName = _chatroomName;
    }

    public get chatroomDetails(): Object {
        return {roomId: this.roomId, chatroomName: this.chatroomName};
    }
}
