import {useState} from "react";
import {MenuSetter} from "../../types/menu_setter";

export default function CreateChat({setMenu}: {setMenu: MenuSetter}) {
    const [username, setUsername] = useState<string>("anonymous");
    const [chatroomName, setChatroomName] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!chatroomName) {
                return;
            }
            const response = await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/api/createchat`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, chatroomName}),
            });

            if (!response.ok) throw new Error("Could not create chatroom.");

            const data = await response.json();

            const chatroomResponse = await fetch(`/jatty/chatroom/${data.roomId}`);
            if (!chatroomResponse.ok) throw new Error("u a bum");
        } catch (e) {
            console.error("Error: ", e);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleChatroomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setChatroomName(e.target.value);

    return (
        <>
            <div
                id="create-chat-menu"
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

                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input
                            type="text"
                            placeholder="Enter your name or be anonymous"
                            className="w-full"
                            name="jattyName"
                            onChange={handleNameChange}
                        />
                    </label>
                    <label>
                        <p>Create a name for your chatroom.</p>
                        <input
                            type="text"
                            placeholder="Chatroom name"
                            className="w-full"
                            name="chatroomName"
                            required
                            onChange={handleChatroomNameChange}
                        />
                    </label>
                    <input type="submit" />
                </form>
            </div>
        </>
    );
}
