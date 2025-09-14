import {useState, useEffect} from "react";
import {MenuSetter} from "../../types/menu_setter";
import IChatroom from "../../../../public/types/IChatroom";
import {Link} from "react-router-dom";

export default function JoinChat({setMenu}: {setMenu: MenuSetter}) {
    const [chatrooms, setChatrooms] = useState<IChatroom[]>([]);

    const getChatrooms = async () => {
        const response = await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/api/chatrooms`);
        if (!response.ok) console.error("U SOLD FAM");

        const data = await response.json();
        setChatrooms(data.chatrooms);
    };

    useEffect(() => {
        getChatrooms();
    }, []);

    return (
        <>
            <div
                id="join-chat-menu"
                className="w-full"
            >
                <div>
                    <button
                        className="text-2xl border-2 rounded-2xl p-3 my-4"
                        onClick={() => setMenu(null)}
                    >
                        Back
                    </button>
                </div>
                <div>
                    <h3 className="text-2xl">Join an open chat.</h3>
                </div>

                <div className="border-1 border-white">
                    <ul className="w-full">
                        {chatrooms.map((room) => (
                            <li
                                key={room.roomId}
                                className="w-full"
                            >
                                <div className="bg-neutral-300 border-y-2 border-black p-6 w-full">
                                    <Link
                                        className="text-black"
                                        to={`/jatty/chatroom/${room.roomId}`}
                                    >
                                        {room.chatroomName}
                                    </Link>
                                    {/* <a href={`/api/chatrooms/${room.roomId}`}>{room.chatroomName}</a> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
