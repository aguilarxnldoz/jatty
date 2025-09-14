import {useState, useEffect} from "react";
import {MenuSetter} from "../../types/menu_setter";
import IChatroom from "../../../../public/types/IChatroom";

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

                <h3 className="text-2xl">Join an open chat.</h3>

                <div className="border-1 border-white m-auto w-[80%]">
                    <ul>
                        {chatrooms.map((room) => (
                            <div key={room.roomId}>
                                <a href={`/jatty/chatroom/${room.roomId}`}>{room.chatroomName}</a>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
