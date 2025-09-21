import IMessage from "../../../public/types/IMessage";

export default interface IChatContainer {
    socketRef: React.RefObject<SocketIOClient.Socket | null>;
    chatMessages: IMessage[];
}
