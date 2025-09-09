import {Routes, Route, Link} from "react-router-dom";
import Home from "./views/home";
import ChatRoom from "./views/chatroom";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/jatty/home"
                    element={<Home />}
                />
                <Route
                    path="/jatty/chatroom/:roomId"
                    element={<ChatRoom />}
                />
            </Routes>
        </>
    );
}

export default App;
