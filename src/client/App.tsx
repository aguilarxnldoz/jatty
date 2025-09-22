import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./views/home";
import ChatRoom from "./views/chatroom";

function App() {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/jatty/home"
                            replace
                        />
                    }
                />
                <Route
                    path="/jatty/home"
                    element={<Home />}
                />
                <Route
                    path="/jatty/chatroom/:roomId"
                    element={<ChatRoom />}
                />
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/jatty/home"
                            replace
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
