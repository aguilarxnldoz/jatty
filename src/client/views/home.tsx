import Header from "../components/header.tsx";
import JattyMenu from "../components/home_page/chat_menu.tsx";
import CreateChat from "../components/home_page/create_chat.tsx";

import {useState} from "react";
import JoinChat from "../components/home_page/join_chat.tsx";

export default function Home() {
    const [menu, setMenu] = useState<number | null>(null);

    return (
        <>
            <div id="app-wrapper">
                <Header />
                <main className="max-w-full w-full">
                    {!menu && (
                        <>
                            <JattyMenu setMenu={setMenu} />
                        </>
                    )}

                    {menu === 1 && (
                        <>
                            <CreateChat setMenu={setMenu} />
                        </>
                    )}

                    {menu === 2 && (
                        <>
                            <JoinChat setMenu={setMenu} />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
