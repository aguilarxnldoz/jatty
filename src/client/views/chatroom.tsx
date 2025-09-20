import Header from "../components/header";
import {useParams, useNavigate} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import io from "socket.io-client";
import IChatroom from "../../../public/types/IChatroom";
import IMessage from "../../../public/types/IMessage";

export default function ChatRoom() {
    const navigate = useNavigate();
    const [chatroomData, setChatroomData] = useState<IChatroom | null>(null);
    const [message, setMessage] = useState<string>("");
    const {roomId} = useParams<string>();
    const socketRef = useRef<SocketIOClient.Socket | null>(null);

    const getChatroomData = async (): Promise<void> => {
        try {
            const response = await fetch("/api/chatroomdata", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({roomId}),
            });

            if (!response.ok) throw new Error("Could not obtain chatroom data");
            const data = await response.json();

            setChatroomData(data.chatroomData);
        } catch (e) {
            console.error(e);
        }
    };

    // keeps track of message state
    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

    // sends the message to the backend
    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const trimmedMessage = message.trim();
            if (!trimmedMessage) return;

            socketRef.current?.emit("sent-message", {
                roomId: chatroomData?.roomId,
                message: message,
            });
            setMessage("");
        } catch (e) {
            console.error("u sold bruh ", e);
        }
    };

    // get the current chatroom data
    useEffect(() => {
        socketRef.current = io.connect(`http://localhost:${import.meta.env.VITE_API_PORT}`);
        getChatroomData();
    }, []);

    // notifies when a connection occurs
    useEffect(() => {
        socketRef.current?.emit("room-joined", {message: `User: ${socketRef.current.id} has joined the chatroom`, roomId: chatroomData?.roomId});
    }, [chatroomData, roomId]);

    // recieves messages
    useEffect(() => {
        socketRef.current?.on("new-message", (data: IMessage) => {
            console.log("NEW MESSAGE: ", data.message);
        });
    });

    return (
        <>
            <div
                id="app-wrapper"
                className="min-h-screen flex flex-col"
            >
                <h2 className="inline text-xs  lg:text-lg">
                    Chatroom: {chatroomData?.chatroomName}
                    <span className="inline ml-5">Room Id: {chatroomData?.roomId}</span>
                </h2>
                <Header />

                <div
                    id="chat-container"
                    className="flex-1 overflow-y-auto"
                ></div>

                <div
                    id="message-bar"
                    className="w-full bg-white rounded-2xl p-2 sticky bottom-3"
                >
                    <form
                        onSubmit={handleSendMessage}
                        className="w-full flex flex-row space-x-full"
                    >
                        <div className="flex-1">
                            <input
                                type="text"
                                value={message}
                                onChange={handleMessageChange}
                                className="w-full p-3 text-black"
                                placeholder="send a message"
                            />
                        </div>

                        <div
                            id="send-message-button"
                            className="text-black rounded-full text-xs p-1"
                        >
                            <input
                                type="submit"
                                value={"Send"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
