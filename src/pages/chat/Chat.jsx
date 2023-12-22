import React, { useEffect, useState } from "react";
// import Style from "./Chat.module.css";
import io from "socket.io-client";
import { API } from "../../config/api/api.config";
import { MESSAGES_TYPES } from "../../utils/constants";
import ChatSidebar from "../../components/chat/ChatSidebar";
import MainChat from "../../components/chat/MainChat";
import { useSelector } from "react-redux";
import RingsLoading from "../../components/RingsLoading";

const socket = io(API.hostUrl, {
    reconnectionDelay: 5000,
    reconnectionDelayMax: 10000,
});

const Chat = () => {
    const [socketConnected, setSocketConnected] = useState(false);
    const chatState = useSelector((state) => state.chat);
    
    useEffect(() => {
        socket.emit("setup", localStorage.getItem("user_id"));
        socket.on("connected", () => {
            setSocketConnected(true);
            console.log("Connected to socket");
        });
    }, []);
    return (
        <div className={`row m-0 h-100`} style={{ backgroundColor: "#f0f2f5" }}>
            <ChatSidebar />
            {socketConnected &&
                !chatState.chatLoading &&
                chatState.currentChat && <MainChat socket={socket} />}
            <div className="col-8 d-flex justify-content-center">
                <div className="align-self-center">
                    {socketConnected &&
                        !chatState.chatLoading &&
                        !chatState.currentChat &&
                        "Select Chat to get connected."}
                    {!socketConnected &&
                        !chatState.chatLoading &&
                        "Not connected with server, Please check your Internet and try again"}
                    {chatState.chatLoading && <RingsLoading />}
                </div>
            </div>
        </div>
    );
};
export default Chat;
