import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import Style from "./MainChat.module.css";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/responseHandler";
import axios from "axios";
import { API } from "../../config/api/api.config";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat";
import useHeaders from "../../hooks/useHeaders";
import { socket } from "../../socket";

export default function MainChat({ chatState }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);
    const headers = useHeaders();
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatState.messages]);

    useEffect(() => {
        function onPrivateMessageReceived(m, chat_id) {
            console.log("Message received new")
            if(chat_id === chatState.currentChat)
            dispatch(chatActions.newMessage(m));
        }
        socket.emit("join_chat", chatState.currentChat);
        socket.on("chat_connected", (id_got) => {
            console.log(">> Chat connected : ", id_got);
        });
        socket.on("private_message_received", onPrivateMessageReceived);
        return () => {
            socket.emit("leave_chat", chatState.currentChat);
            socket.off("chat_connected");
            socket.off("private_message_received", onPrivateMessageReceived);
        };
    }, []);

    const currentMessageHandler = async (e) => {
        if (e.key !== "Enter") return;
        // console.log(currentMessage);
        try {
            const response = await axios.post(
                API.endpoint + `/chat/send-message/${chatState.currentChat}`,
                { content: currentMessage },
                {
                    ...headers,
                }
            );
            const message = {
                id: response.data.data.id,
                content: currentMessage,
                readbyMessage: [],
                messageSender: {
                    id: localStorage.getItem("user_id"),
                },
            };
            socket.emit("private_message", message, chatState.currentChat);
            dispatch(chatActions.newMessage(message));
        } catch (err) {
            console.log("error occc", err);
            toast.error("Something went wrong", toastOptions);
        }
        // socket.emit("b_m", {
        //     type: MESSAGES_TYPES.OTHER,
        //     message: currentMessage,
        // });
        setCurrentMessage("");
    };

    return (
        <div className={`col-8 ${Style["chat-container"]}`}>
            <div className="h-100 d-flex flex-column">
                <div className="position-relative w-100 h-100">
                    <div className={Style["messages-absolute-container"]}>
                        <div className="d-flex flex-column-reverse">
                            {/*----------------- MESSAGE START ---------------------- */}
                            <div ref={messagesEndRef} />
                            {chatState.messages.map((currentMessage, key) => {
                                if (
                                    chatState.messages[
                                        chatState.messages.length - 1 - key
                                    ].messageSender.id ===
                                    localStorage.getItem("user_id")
                                )
                                    return (
                                        <div
                                            className="align-self-start mb-3"
                                            key={key}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
                                                    left: "20px",
                                                }}
                                            >
                                                <div
                                                    className={`${Style["chat-box-me"]}`}
                                                >
                                                    {
                                                        chatState.messages[
                                                            chatState.messages
                                                                .length -
                                                                1 -
                                                                key
                                                        ].content
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                else if (
                                    chatState.messages[
                                        chatState.messages.length - 1 - key
                                    ].messageSender.id !==
                                    localStorage.getItem("user_id")
                                )
                                    return (
                                        <div
                                            className="align-self-end mb-3"
                                            key={key}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
                                                    right: "20px",
                                                }}
                                            >
                                                <div
                                                    className={`${Style["chat-box-receiver"]}`}
                                                >
                                                    {
                                                        chatState.messages[
                                                            chatState.messages
                                                                .length -
                                                                1 -
                                                                key
                                                        ].content
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    );
                                // else if (
                                //     allMessages[allMessages.length - 1 - key]
                                //         .type === MESSAGES_TYPES.TOTAL_USER
                                // )
                                //     return (
                                //         <div
                                //             className={`align-self-center mb-3`}
                                //             key={key}
                                //         >
                                //             <div
                                //                 style={{
                                //                     position: "relative",
                                //                 }}
                                //             >
                                //                 {
                                //                     allMessages[
                                //                         allMessages.length -
                                //                             1 -
                                //                             key
                                //                     ].message
                                //                 }
                                //             </div>
                                //         </div>
                                //     );
                                return <div>Something wrong</div>;
                            })}

                            {/*----------------- MESSAGE END ---------------------- */}
                        </div>
                    </div>
                </div>
                <div className={`mt-2 ${Style["message-container"]}`}>
                    <InputText
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={currentMessageHandler}
                        placeholder="Enter your message..."
                        className="w-100"
                    />
                </div>
            </div>
        </div>
    );
}
