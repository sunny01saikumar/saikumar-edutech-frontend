import { useEffect, useState } from "react";
import API from "../api/axios";

function Chat() {

    const [users,setUsers] =
        useState([]);

    const [selectedUser,setSelectedUser] =
        useState(null);

    const [messages,setMessages] =
        useState([]);

    const [message,setMessage] =
        useState("");

    const [currentUser,setCurrentUser] =
        useState(null);



    useEffect(()=>{

        loadCurrentUser();
        loadUsers();

    },[]);



    const loadCurrentUser =
    async()=>{

        try{

            const response =
                await API.get(
                    "/auth/me"
                );

            setCurrentUser(
                response.data
            );

        }catch(error){

            console.log(error);

        }

    };




    const loadUsers =
    async()=>{

        try{

            const response =
                await API.get(
                    "/users"
                );

            setUsers(
                response.data
            );

        }catch(error){

            console.log(error);

        }

    };




    const selectUser =
    async(user)=>{

        setSelectedUser(
            user
        );

        if(!currentUser) return;

        try{

            const response =
                await API.get(

`/chat/conversation?user1=${currentUser.id}&user2=${user.id}`

                );

            setMessages(
                response.data
            );

        }catch(error){

            console.log(error);

        }

    };




    const sendMessage =
    async()=>{

        if(
            !message.trim()
            ||
            !selectedUser
        )
        return;


        try{

            await API.post(

                "/chat/send",

                {

                    senderId:
                    currentUser.id,

                    receiverId:
                    selectedUser.id,

                    content:
                    message

                }

            );


            setMessage("");


            const response =
                await API.get(

`/chat/conversation?user1=${currentUser.id}&user2=${selectedUser.id}`

                );


            setMessages(
                response.data
            );

        }

        catch(error){

            console.log(error);

        }

    };



    return(

<div className="chat-page">


    {/* LEFT SIDE */}

    <div className="chat-users">

        <h2>Messages</h2>


        {

        users.map(user=>(

        <div

            key={user.id}

            className={`user-item ${
                selectedUser?.id===user.id
                ?
                "active-user"
                :
                ""
            }`}

            onClick={()=>
                selectUser(user)
            }

        >

        <div
        className="user-avatar"
        >

        {

        user.username
        ?.charAt(0)
        .toUpperCase()

        }

        </div>


        <div>

        <div
        className="user-name"
        >

        {user.username}

        </div>

        </div>

        </div>

        ))

        }

    </div>




    {/* RIGHT SIDE */}


    <div className="chat-box">


        <div
        className="chat-header"
        >

        {

        selectedUser

        ?

        selectedUser.username

        :

        "Select User"

        }

        </div>



        <div
        className="chat-messages"
        >

        {

        messages.map(msg=>(

        <div

        key={msg.id}

        className={

        msg.senderId
        ===
        currentUser?.id

        ?

        "message-right"

        :

        "message-left"

        }

        >

        {msg.content}

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

        value={message}

        placeholder="Type message..."

        onChange={(e)=>
            setMessage(
                e.target.value
            )
        }

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