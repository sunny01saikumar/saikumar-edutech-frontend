import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaImage,
    FaUpload,
    FaBookOpen
} from "react-icons/fa";

function Sidebar({ open, setOpen }) {

    return (

        <div className={`sidebar ${open ? "open" : ""}`}>

            <button
                className="close-btn"
                onClick={() => setOpen(false)}
            >
                ✕
            </button>

            <div className="logo">
                SAI
            </div>

            <div className="sidebar-menu">

                <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                >
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/feed"
                    onClick={() => setOpen(false)}
                >
                    <FaImage />
                    <span>Feed</span>
                </NavLink>

                <NavLink
                    to="/upload"
                    onClick={() => setOpen(false)}
                >
                    <FaUpload />
                    <span>Upload</span>
                </NavLink>

                {/* <NavLink
                    to="/blogs"
                    onClick={() => setOpen(false)}
                >
                    <FaBookOpen />
                    <span>Blogs</span>
                </NavLink> */}

            </div>

        </div>
    );
}

export default Sidebar;