import Header from "../components/header";
import {useParams, useNavigate} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import io from "socket.io-client";
import IChatroom from "../../../public/types/IChatroom";

export default function ChatRoom() {
    const navigate = useNavigate();
    const [chatroomData, setChatroomData] = useState<IChatroom | null>(null);
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

    useEffect(() => {
        socketRef.current = io.connect(`http://localhost:${import.meta.env.VITE_API_PORT}`);
        getChatroomData();
    }, []);

    useEffect(() => {
        socketRef.current?.emit("roomJoined", {message: `User: ${socketRef.current.id} has joined the chatroom`});
    }, [chatroomData]);

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
                        action=""
                        className="w-full flex flex-row space-x-full"
                    >
                        <div className="flex-1">
                            <input
                                type="text"
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
                                placeholder="->"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
