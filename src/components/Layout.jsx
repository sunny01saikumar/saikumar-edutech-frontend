import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {

    const [open,setOpen] = useState(false);

    return (

        <div className="app-layout">

            <Sidebar
                open={open}
                setOpen={setOpen}
            />

            <div className="main-content">

                <Navbar
                    setOpen={setOpen}
                />

                <Outlet/>

            </div>

        </div>
    );
}

export default Layout;