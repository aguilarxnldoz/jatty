import Header from "../components/header";
import {useParams} from "react-router-dom";

export default function ChatRoom() {
    const {roomId} = useParams<string>();

    return (
        <>
            <div id="app-wrapper">
                <Header />
                <h2>Chatroom: {roomId}</h2>
            </div>
        </>
    );
}
