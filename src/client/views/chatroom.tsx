import Header from "../components/header";
import {useParams} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import io from "socket.io-client";
import IChatroom from "../../../public/types/IChatroom";
import {useNavigate} from "react-router-dom";

// const socket = io.connect(`http://localhost:${import.meta.env.VITE_API_PORT}`);

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
            <div id="app-wrapper">
                <Header />
                <h2>Chatroom: {chatroomData?.chatroomName}</h2>
            </div>
        </>
    );
}
