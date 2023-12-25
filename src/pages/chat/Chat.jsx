import React, { useEffect, useState } from "react";
// import Style from "./Chat.module.css";
import ChatSidebar from "../../components/chat/ChatSidebar";
import MainChat from "../../components/chat/MainChat";
import { useSelector } from "react-redux";
import RingsLoading from "../../components/RingsLoading";

const Chat = () => {
    const chatState = useSelector((state) => state.chat);
    const socketState = useSelector(state => state.socket)

    return (
        <div className={`row m-0 h-100`} style={{ backgroundColor: "#f0f2f5" }}>
            <ChatSidebar />
            {socketState.isConnected &&
            !chatState.chatLoading &&
            chatState.currentChat ? (
                <MainChat chatState={chatState} />
            ) : (
                <div className="col-8 d-flex justify-content-center">
                    <div className="align-self-center">
                        {socketState.isConnected &&
                            !chatState.chatLoading &&
                            !chatState.currentChat &&
                            "Select Chat to get connected."}
                        {!socketState.isConnected &&
                            !chatState.chatLoading &&
                            "Not connected with server, Please check your Internet and try again"}
                        {chatState.chatLoading && <RingsLoading />}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Chat;
