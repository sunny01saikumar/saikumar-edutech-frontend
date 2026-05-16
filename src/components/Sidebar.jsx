import {
    Link
} from "react-router-dom";

import {
    FaHome,
    FaImage,
    FaUpload,
    FaComments
} from "react-icons/fa";

function Sidebar() {

    return (

        <div className="sidebar">

            <div className="logo">
                SAI
            </div>

            <div className="sidebar-menu">

                <Link to="/dashboard">

                    <FaHome />

                    Dashboard

                </Link>

                <Link to="/feed">

                    <FaImage />

                    Feed

                </Link>

                <Link to="/upload">

                    <FaUpload />

                    Upload

                </Link>

                <Link to="/chat">

                    <FaComments />

                    Chat

                </Link>

            </div>

        </div>
    );
}

export default Sidebar;