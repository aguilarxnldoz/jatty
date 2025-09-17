import Header from "../components/header";
import {useParams} from "react-router-dom";
import {useRef, useEffect} from "react";
import io from "socket.io-client";
const socket = io.connect(`http://localhost:${import.meta.env.VITE_API_PORT}`);

export default function ChatRoom() {
    const {roomId} = useParams<string>();

    useEffect(() => {
        socket.emit("roomJoined", {message: `User: ${socket.id} has joined the chatroom`});
    });

    return (
        <>
            <div id="app-wrapper">
                <Header />
                <h2>Chatroom: {roomId}</h2>
            </div>
        </>
    );
}
