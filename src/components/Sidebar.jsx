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

            {/* sidebar menu */}

        </div>

    );
}

export default Sidebar;