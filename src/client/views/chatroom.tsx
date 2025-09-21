import Header from "../components/header";
import {useParams, useNavigate} from "react-router-dom";
import {useRef, useEffect, useState} from "react";
import io from "socket.io-client";
import IChatroom from "../../../public/types/IChatroom";
import IMessage from "../../../public/types/IMessage";
import ChatContainer from "../components/chat/chat_container";
import MessageBar from "../components/chat/message_bar";

export default function ChatRoom() {
    const navigate = useNavigate();
    const [chatroomData, setChatroomData] = useState<IChatroom | null>(null);
    const [message, setMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
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
            navigate("/");
        }
    };

    // keeps track of message state
    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

    // sends the message to the backend
    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const trimmedMessage = message.trim();
            if (!trimmedMessage) return;

            socketRef.current?.emit("sent-message", {
                roomId: chatroomData?.roomId,
                message: trimmedMessage,
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
            setChatMessages((messages) => [...messages, data]);
        });
        return;
    }, []);

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

                <ChatContainer
                    socketRef={socketRef}
                    chatMessages={chatMessages}
                />

                <MessageBar
                    handleSendMessage={handleSendMessage}
                    handleMessageChange={handleMessageChange}
                    message={message}
                />
            </div>
        </>
    );
}
