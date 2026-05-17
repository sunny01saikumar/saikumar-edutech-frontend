import { useEffect, useState } from "react";
import API from "../api/axios";

function Chat() {

    const [users, setUsers] = useState([]);

    const [selectedUser,
        setSelectedUser] =
        useState(null);

    const [messages,
        setMessages] =
        useState([]);

    const [message,
        setMessage] =
        useState("");



    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "user"
            ) || "{}"
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
                await API.get(
                    "/users"
                );

            console.log(
                response.data
            );

            const filteredUsers =
                response.data.filter(

                    user =>

                    user.id !==
                    currentUser?.id

                );

            setUsers(
                filteredUsers
            );

        }
        catch (error) {

            console.log(
                error
            );

        }

    };



    /*
        OPEN CHAT
    */

    const openChat =
        async (user) => {

        setSelectedUser(
            user
        );

        try {

            const response =
                await API.get(

`/chat/conversation?user1=${currentUser.id}&user2=${user.id}`

                );

            setMessages(
                response.data
            );

        }
        catch (error) {

            console.log(
                error
            );

            setMessages([]);

        }

    };



    /*
        SEND MESSAGE
    */

    const sendMessage =
        async () => {

        if (
            !message.trim()
        ) return;


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


            setMessages(
                prev => [

                    ...prev,

                    response.data

                ]
            );


            setMessage(
                ""
            );


        }
        catch (error) {

            console.log(
                error
            );

        }

    };



    return (

        <div
            className="chat-page"
        >


            {/* USERS PANEL */}


            <div
                className="chat-users"
            >

                <h2>

                    Chats

                </h2>


                {

                    users.length === 0

                    ?

                    <p>

                        No Users

                    </p>

                    :

                    users.map(

                        user => (

                        <div

                            key={
                                user.id
                            }

                            className={`user-item ${
                                selectedUser?.id
                                ===
                                user.id

                                ?

                                "active-user"

                                :

                                ""
                            }`}

                            onClick={() =>
                                openChat(
                                    user
                                )
                            }

                        >

                            <div
                            className="user-avatar">

                            {

                            (
                                user.userName ||

                                user.username ||

                                "U"
                            )

                            .charAt(0)

                            .toUpperCase()

                            }

                            </div>


                            <div
                            className="user-name">

                            {

                            user.userName ||

                            user.username

                            }

                            </div>

                        </div>

                    ))

                }

            </div>





            {/* CHAT SECTION */}



            <div
                className="chat-box"
            >


                <div
                    className="chat-header"
                >

                    {

                        selectedUser

                        ?

                        <>

                        <div
                        className="user-avatar">

                        {

                        (
                        selectedUser.userName ||

                        selectedUser.username

                        )

                        .charAt(0)

                        .toUpperCase()

                        }

                        </div>

                        <span>

                        {

                        selectedUser.userName ||

                        selectedUser.username

                        }

                        </span>

                        </>

                        :

                        "Select User To Start Chat"

                    }

                </div>




                <div
                className="chat-messages"
                >


                {

                    messages.length===0

                    &&

                    selectedUser

                    &&

                    <div
                    className="empty-chat">

                    Start conversation 👋

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
                className="chat-input-box">

                <input

                className="chat-input"

                placeholder="Type message..."

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

                onClick={
                    sendMessage
                }

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