import { useEffect, useState } from "react";
import API from "../api/axios";

function Chat() {

    const [users,setUsers] = useState([]);

    const [selectedUser,setSelectedUser] =
        useState(null);

    useEffect(()=>{

        loadUsers();

    },[]);


    const loadUsers = async()=>{

        try{

            const response =
                await API.get("/users");

            setUsers(
                response.data
            );

        }
        catch(error){

            console.log(error);
        }

    };

    return(

        <div className="chat-page">

            <div className="chat-users">

                <h2>
                    Chats
                </h2>

                {

                    users.map(user=>(

                        <div
                            key={user.id}
                            className="user-item"
                            onClick={()=>setSelectedUser(user)}
                        >

                            <div className="user-name">

                                {user.username}

                            </div>

                        </div>

                    ))
                }

            </div>


            <div className="chat-box">

                <div className="chat-header">

                    {

                        selectedUser
                        ?
                        selectedUser.username
                        :
                        "Select User To Start Chat"

                    }

                </div>

                <div className="chat-messages">

                </div>

            </div>

        </div>

    );
}

export default Chat;