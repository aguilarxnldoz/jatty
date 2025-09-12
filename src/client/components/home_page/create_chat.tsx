import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {MenuSetter} from "../../types/menu_setter";

export default function CreateChat({setMenu}: {setMenu: MenuSetter}) {
    const [username, setUsername] = useState<string>("anonymous");
    const [chatVisibility, setChatVisibility] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!chatVisibility) {
            return;
        }

        const response = await fetch(`http://localhost:${import.meta.env.VITE_API_PORT}/api/createchat`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, chatVisibility}),
        });

        if (!response.ok) throw new Error("Could not create chatroom.");

        const data = await response.json();
        console.log(data);
        navigate(`/jatty/chatroom/${data.roomId}`);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => setChatVisibility(e.target.value);

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
                    <input type="submit" />
                </form>
            </div>
        </>
    );
}
