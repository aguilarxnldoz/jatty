import {useState, useEffect} from "react";
import {MenuSetter} from "../../types/menu_setter";

export default function JoinChat({setMenu}: {setMenu: MenuSetter}) {
    const getChatrooms = async () => {
        const response = await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/api/chatrooms`);
        if (!response.ok) console.error("U SOLD FAM");

        const data = await response.json();
        console.log(data.chatrooms);
    };

    useEffect(() => {}, []);

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
                    <button onClick={() => getChatrooms()}>bruhhhhhhh</button>
                </div>
            </div>
        </>
    );
}
