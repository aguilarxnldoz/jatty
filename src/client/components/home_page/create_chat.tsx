import {useState} from "react";
import {MenuSetter} from "../../types/menu_setter";
import {useNavigate} from "react-router-dom";
import BackButton from "./back_button";
export default function CreateChat({setMenu}: {setMenu: MenuSetter}) {
    const [username, setUsername] = useState<string>("anonymous");
    const [chatroomName, setChatroomName] = useState<string | null>(null);

    const navigate = useNavigate();

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

            navigate(`/jatty/chatroom/${data.roomId}`);
        } catch (e) {
            console.error("Error: ", e);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleChatroomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setChatroomName(e.target.value);

    return (
        <>
            <BackButton setMenu={setMenu} />
            <div
                id="create-chat-menu"
                className="w-full mt-15 flex justify-center"
            >
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >
                    <label className="">
                        <p className="text-lg font-bold">Enter a username</p>
                        <input
                            id="create-chat-input"
                            type="text"
                            placeholder="anonymous"
                            className="w-full lg:w-[50rem] p-1.5 rounded-md border-1 border-white shadow-md"
                            name="jattyName"
                            onChange={handleNameChange}
                        />
                    </label>
                    <label>
                        <p className="text-lg font-bold">Enter chatroom name.</p>
                        <input
                            id="create-chat-input"
                            type="text"
                            placeholder="Chatroom name"
                            className="w-full lg:w-[50rem] p-1.5 rounded-md border-1 border-white shadow-md"
                            name="chatroomName"
                            required
                            onChange={handleChatroomNameChange}
                        />
                    </label>
                    <label className="mt-4">
                        <input
                            id="submit-create-chat"
                            type="submit"
                            className="rounded-2xl p-3 w-50 text-center border-1 shadow-black shadow-md"
                        />
                    </label>
                </form>
            </div>
        </>
    );
}
