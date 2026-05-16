import { useEffect, useState } from "react";
import API from "../services/API";

function Dashboard() {

    const [stats, setStats] = useState({

        totalImages: 0,
        totalChats: 0,
        activeUsers: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const imageResponse =
                await API.get("/images");

            const chatResponse =
                await API.get("/chat/conversation");

            const userResponse =
                await API.get("/users");

            setStats({

                totalImages:
                    imageResponse.data.length,

                totalChats:
                    chatResponse.data.length,

                activeUsers:
                    userResponse.data.length

            });

        }
        catch(error){

            console.log(error);

        }

    };

    return (

        <div className="content">

            <div className="dashboard-grid">

                <div className="stat-card blue">

                    <h2>{stats.totalImages}</h2>

                    <p>Total Images</p>

                </div>

                <div className="stat-card green">

                    <h2>{stats.totalChats}</h2>

                    <p>Total Chats</p>

                </div>

                <div className="stat-card orange">

                    <h2>{stats.activeUsers}</h2>

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