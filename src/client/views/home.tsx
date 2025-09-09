import Header from "../components/header.tsx";
import JattyMenu from "../components/home_page/chat_menu.tsx";
import CreateChat from "../components/home_page/create_chat.tsx";

import {useState} from "react";

export default function Home() {
    const [menu, setMenu] = useState<number | null>(null);

    return (
        <>
            <div id="app-wrapper">
                <Header />
                <main className="max-w-full w-full">
                    {!menu && (
                        <>
                            <h3>Start chatting</h3>
                            <JattyMenu setMenu={setMenu} />
                        </>
                    )}

                    {menu === 1 && (
                        <>
                            <CreateChat setMenu={setMenu} />
                        </>
                    )}
                </main>
            </div>
        </>
    );
}
