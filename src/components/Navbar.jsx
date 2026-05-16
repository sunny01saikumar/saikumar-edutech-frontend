import { FaBars } from "react-icons/fa";

function Navbar({setOpen}) {

    return (

        <div className="navbar">

            <button
                className="menu-btn"
                onClick={()=>setOpen(prev=>!prev)}
            >
                <FaBars/>
            </button>

            <h1 className="nav-title">
                Saikumar EduTech
            </h1>

            <div className="nav-user">
                Welcome Admin
            </div>

        </div>

    );
}

export default Navbar;