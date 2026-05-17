import { useEffect, useState } from "react";
import API from "../api/axios";

function Chat() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const currentUser =
        JSON.parse(
            localStorage.getItem("user")
        );

    useEffect(() => {

        loadUsers();

    }, []);


    /*
      LOAD USERS
    */

    const loadUsers = async () => {

        try {

            const response =
                await API.get("/users");

            console.log(
                response.data
            );

            const filteredUsers =
                response.data.filter(
                    user =>
                        user.id !== currentUser.id
                );

            setUsers(filteredUsers);

        } catch (error) {

            console.log(error);

        }

    };


    /*
      OPEN CHAT
    */

    const openChat = async (user) => {

        setSelectedUser(user);

        try {

            const response =
                await API.get(
                    `/chat/conversation?user1=${currentUser.id}&user2=${user.id}`
                );

            setMessages(
                response.data
            );

        } catch (error) {

            console.log(error);

        }

    };


    /*
      SEND MESSAGE
    */

    const sendMessage = async () => {

        if (!message.trim())
            return;

        try {

            const response =
                await API.post(
                    "/chat/send",
                    {
                        senderId:
                            currentUser.id,

                        receiverId:
                            selectedUser.id,

                        message:
                            message
                    }
                );

            setMessages(prev => [

                ...prev,

                response.data

            ]);

            setMessage("");

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="chat-page">

            {/* USERS */}

            <div className="chat-users">

                <h2>Messages</h2>

                {

                    users.map(user => (

                        <div
                            key={user.id}

                            className={`user-item ${
                                selectedUser?.id === user.id
                                ? "active-user"
                                : ""
                            }`}

                            onClick={() =>
                                openChat(user)
                            }
                        >

                            <div
                                className="user-avatar"
                            >

                                {
                                    user.userName
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                }

                            </div>

                            <div>

                                <div
                                    className="user-name"
                                >

                                    {user.userName}

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>



            {/* CHAT BOX */}

            <div className="chat-box">

                <div
                    className="chat-header"
                >

                    {

                        selectedUser ?

                        <>

                            <div
                                className="user-avatar"
                            >

                                {
                                    selectedUser
                                    .userName
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                }

                            </div>

                            <span>

                                {
                                    selectedUser
                                    .userName
                                }

                            </span>

                        </>

                        :

                        "Select User"

                    }

                </div>



                <div
                    className="chat-messages"
                >

                    {

                        messages.length === 0
                        && selectedUser &&

                        <div
                            style={{
                                textAlign:"center",
                                color:"#64748b",
                                marginTop:"30px"
                            }}
                        >

                            Start conversation

                        </div>

                    }


                    {

                        messages.map(
                            (msg,index)=>(

                            <div
                                key={index}

                                className={

                                    msg.senderId ===
                                    currentUser.id

                                    ?

                                    "message-right"

                                    :

                                    "message-left"

                                }
                            >

                                {
                                    msg.message
                                }

                            </div>

                        ))

                    }

                </div>



                {

                    selectedUser &&

                    <div
                        className="chat-input-box"
                    >

                        <input

                            className="chat-input"

                            placeholder="Message..."

                            value={message}

                            onChange={(e)=>
                                setMessage(
                                    e.target.value
                                )
                            }

                            onKeyDown={(e)=>{

                                if(
                                    e.key==="Enter"
                                ){

                                    sendMessage();

                                }

                            }}

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