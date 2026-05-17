import { useEffect, useState } from "react";
import API from "../api/axios";

function Chat() {

    const [users,setUsers] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null);

    const [message,setMessage] = useState("");
    const [messages,setMessages] = useState([]);

    useEffect(()=>{

        loadUsers();

    },[]);


    const loadUsers = async()=>{

        try{

            const response =
                await API.get("/users");

            const currentUser =
                JSON.parse(
                    localStorage.getItem("user")
                );

            setUsers(

                response.data.filter(
                    user =>
                    user.id !== currentUser.id
                )

            );

        }catch(error){

            console.log(error);

        }

    };


    const sendMessage=()=>{

        if(!message.trim()) return;

        setMessages(prev=>[
            ...prev,
            {
                text:message,
                mine:true
            }
        ]);

        setMessage("");

    };



    return(

        <div className="chat-page">

            {/* LEFT USERS */}

            <div className="chat-users">

                <h2>Messages</h2>

                {

                    users.map(user=>(

                        <div
                            key={user.id}
                            className="user-item"
                            onClick={()=>
                                setSelectedUser(user)
                            }
                        >

                            <div className="user-avatar">

                                {user.username
                                    .charAt(0)
                                    .toUpperCase()}

                            </div>

                            <div>

                                <div className="user-name">

                                    {user.username}

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>



            {/* RIGHT CHAT */}

            <div className="chat-box">


                <div className="chat-header">

                    {

                        selectedUser ?

                        <>

                            <div
                                className="user-avatar"
                            >

                            {selectedUser.username
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            {selectedUser.username}

                        </>

                        :

                        "Select User"

                    }

                </div>



                <div className="chat-messages">

                    {

                        messages.map((msg,index)=>(

                            <div
                                key={index}

                                className={
                                    msg.mine
                                    ?
                                    "message-right"
                                    :
                                    "message-left"
                                }
                            >

                                {msg.text}

                            </div>

                        ))

                    }

                </div>



                {

                    selectedUser &&

                    <div className="chat-input-box">

                        <input

                            className="chat-input"

                            placeholder="Message..."

                            value={message}

                            onChange={(e)=>
                                setMessage(
                                    e.target.value
                                )
                            }

                        />

                        <button

                            className="send-btn"

                            onClick={sendMessage}

                        >

                            Send

                        </button>

                    </div>

                }

            </div>

        </div>

    );

}

export default Chat;