import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {

    const [stats, setStats] = useState({

        totalImages:0,
        totalChats:0,
        activeUsers:0

    });

    const [users,setUsers] = useState([]);

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard = async()=>{

        try{

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

            setUsers(
                userResponse.data
            );

        }
        catch(error){

            console.log(error);

        }
    };

    return(

        <div className="content">

            {/* cards */}

            <div className="dashboard-grid">

                <div className="stat-card blue">

                    <h2>
                        {stats.totalImages}
                    </h2>

                    <p>Total Images</p>

                </div>

                <div className="stat-card green">

                    <h2>
                        {stats.totalChats}
                    </h2>

                    <p>Total Chats</p>

                </div>

                <div className="stat-card orange">

                    <h2>
                        {stats.activeUsers}
                    </h2>

                    <p>Active Users</p>

                </div>

            </div>


            <div className="dashboard-welcome">

                <h1>
                    Welcome to Saikumar EduTech
                </h1>

                <p>
                    Build your social platform with
                    Java + Spring Boot + React
                </p>

            </div>


            {/* USERS */}

            <div className="users-container">

                <h2>
                    Registered Users
                </h2>

                <div className="users-grid">

                    {users.map(user=>(

                        <div
                            key={user.id}
                            className="user-card"
                        >

                            <h3>
                                {user.username}
                            </h3>

                            <p>
                                {user.email}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Dashboard;