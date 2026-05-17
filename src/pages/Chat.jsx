<div className="chat-page">

    <div className="chat-users">

        <h2>Chats</h2>

        {users.map(user=>(
            <div className="user-item">

                <div className="user-name">
                    {user.username}
                </div>

                <div className="user-email">
                    {user.email}
                </div>

            </div>
        ))}

    </div>

    <div className="chat-box">

        <div className="chat-header">
            Select User To Start Chat
        </div>

        <div className="chat-messages">

            <div className="message-left">
                Hello
            </div>

            <div className="message-right">
                Hi
            </div>

        </div>

        <div className="chat-input-box">

            <input
                className="chat-input"
                placeholder="Type message..."
            />

            <button className="send-btn">
                Send
            </button>

        </div>

    </div>

</div>