function Dashboard() {

    return (

        <div className="content">

            <div className="dashboard-grid">

                <div className="stat-card blue">

                    <h2>150</h2>

                    <p>Total Images</p>

                </div>

                <div className="stat-card green">

                    <h2>45</h2>

                    <p>Total Chats</p>

                </div>

                <div className="stat-card orange">

                    <h2>12</h2>

                    <p>Active Users</p>

                </div>

            </div>

            <div className="dashboard-welcome">

                <h1>
                    Welcome to Saikumar EduTech
                </h1>

                <p>
                    Build your social platform with
                    Java + Spring Boot + React.
                </p>

            </div>

        </div>
    );
}

export default Dashboard;