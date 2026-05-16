import { useEffect, useState } from "react";

import API from "../api/axios";

function Chat() {

    const [users, setUsers] =
        useState([]);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    const [message, setMessage] =
        useState("");

    /*
        FETCH USERS
    */

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async () => {

        try {

            const response =
                await API.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    /*
        FETCH MESSAGES
    */

    const fetchMessages = async (userId) => {

        try {

            const response =
                await API.get(
                    `/messages/${userId}`
                );

            setMessages(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    /*
        SELECT USER
    */

    const selectUser = (user) => {

        setSelectedUser(user);

        fetchMessages(user.id);
    };

    /*
        SEND MESSAGE
    */

    const sendMessage = async () => {

        if (!message.trim()) return;

        if (!selectedUser) return;

        try {

            await API.post(
                "/messages/send",
                {
                    receiverId:
                        selectedUser.id,

                    content:
                        message
                }
            );

            setMessage("");

            fetchMessages(
                selectedUser.id
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div className="chat-page">

            {/* USERS LIST */}

            <div className="chat-users">

                <div className="chat-users-header">

                    <h2>
                        Chats
                    </h2>

                </div>

                {

                    users.map((user) => (

                        <div
                            key={user.id}

                            className={`chat-user ${
                                selectedUser?.id === user.id
                                    ? "active-user"
                                    : ""
                            }`}

                            onClick={() =>
                                selectUser(user)
                            }
                        >

                            <div className="chat-avatar">

                                {
                                    user.username
                                        ?.charAt(0)
                                        ?.toUpperCase()
                                }

                            </div>

                            <div className="chat-user-info">

                                <h4>
                                    {user.username}
                                </h4>

                                <p>
                                    {user.email}
                                </p>

                            </div>

                        </div>
                    ))
                }

            </div>

            {/* CHAT AREA */}

            <div className="chat-box">

                {

                    selectedUser ? (

                        <>

                            {/* HEADER */}

                            <div className="chat-header">

                                <div className="chat-avatar">

                                    {
                                        selectedUser.username
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                    }

                                </div>

                                <div>

                                    <h3>
                                        {
                                            selectedUser.username
                                        }
                                    </h3>

                                    <p>
                                        Online
                                    </p>

                                </div>

                            </div>

                            {/* MESSAGES */}

                            <div className="chat-messages">

                                {

                                    messages.map((msg) => (

                                        <div
                                            key={msg.id}

                                            className={`message ${
                                                msg.senderId ===
                                                selectedUser.id
                                                    ? "received"
                                                    : "sent"
                                            }`}
                                        >

                                            <div className="message-content">

                                                {
                                                    msg.content
                                                }

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                            {/* INPUT */}

                            <div className="chat-input-area">

                                <input
                                    type="text"

                                    placeholder="Type message..."

                                    value={message}

                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }

                                    onKeyDown={(e) => {

                                        if (
                                            e.key === "Enter"
                                        ) {

                                            sendMessage();
                                        }
                                    }}
                                />

                                <button
                                    onClick={sendMessage}
                                >

                                    Send

                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="empty-chat">

                            <h2>
                                Select User To Start Chat
                            </h2>

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Chat;