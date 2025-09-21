import {useState, useEffect} from "react";
import {MenuSetter} from "../../types/menu_setter";
import IChatroom from "../../../../public/types/IChatroom";
import {Link} from "react-router-dom";
import BackButton from "./back_button";
import EnterUsername from "./enter_username";

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
            <BackButton setMenu={setMenu} />
            <div
                id="join-chat-menu"
                className="w-full h-screen min-h-0"
            >
                <div className="my-5">
                    <h3 className="text-2xl">Join an open chat.</h3>
                </div>

                {/* <EnterUsername /> */}

                <div className="overflow-hidden">
                    <ul className="w-full overflow-y-auto flex flex-col gap-5">
                        {chatrooms.map((room) => (
                            <li
                                key={room.roomId}
                                className="w-full rounded-2xl border-4 border-white shadow-md"
                            >
                                <Link
                                    className="text-black w-full"
                                    to={`/jatty/chatroom/${room.roomId}`}
                                >
                                    <div className="bg-neutral-300 p-6 w-full rounded-2xl">{room.chatroomName}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
