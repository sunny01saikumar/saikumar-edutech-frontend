import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Upload from "./pages/Upload";

import Gallery from "./pages/Gallery";

// import Chat from "./pages/Chat";
import Blogs from "./pages/Blogs";

import Dashboard from "./pages/Dashboard";

import Layout from "./components/Layout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* AUTH */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* APP LAYOUT */}

                <Route
                    element={<Layout />}
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/feed"
                        element={<Gallery />}
                    />

                    <Route
                        path="/upload"
                        element={<Upload />}
                    />

                    {/* <Route
                        path="/chat"
                        element={<Chat />}
                    /> */}

                    <Route
                        path="/blogs"
                        element={<Blogs />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;