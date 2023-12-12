import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Style from "./Chat.module.css";
import io from "socket.io-client";
import { API } from "../../config/api/api.config";
import { MESSAGES_TYPES } from "../../utils/constants";
const socket = io(API.hostUrl, {
    reconnectionDelay: 5000,
    reconnectionDelayMax: 10000,
});

const Chat = () => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [allMessages, setAllMessages] = useState([
        { type: MESSAGES_TYPES.ME, message: "hi" },
        { type: MESSAGES_TYPES.OTHER, message: "by" },
    ]);
    const currentMessageHandler = (e) => {
        if (e.key !== "Enter") return;
        // console.log(currentMessage);
        socket.emit("b_m", {
            type: MESSAGES_TYPES.OTHER,
            message: currentMessage,
        });
        setAllMessages((prevM) => [
            ...prevM,
            {
                type: MESSAGES_TYPES.ME,
                message: currentMessage,
            },
        ]);
        setCurrentMessage("");
    };

    useEffect(() => {
        socket.emit("setup", localStorage.getItem("user_id"));
        socket.on("connected", () => {
            setSocketConnected(true);
            console.log("Connected to socket");
        });
        socket.on("t_c", (allUser) => {
            console.log(">>> TOTAL CONNECTION GOT : ", allUser);
            setAllMessages((prevM) => [
                ...prevM,
                {
                    type: MESSAGES_TYPES.TOTAL_USER,
                    message: `${allUser.a_u} Users connected`,
                },
            ]);
        });
        socket.on("b_m", (m) => {
            setAllMessages((prevM) => [...prevM, m]);
        });
    }, []);
    return (
        <div className={`row m-0 h-100`} style={{ backgroundColor: "#f0f2f5" }}>
            <div
                className="col-4 border-end p-0"
                style={{ backgroundColor: "white" }}
            >
                <div className="h-100 d-flex flex-column p-0">
                    <div
                        className="d-flex p-3 justify-content-between"
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <div className="w-100 mr-5">
                            <span className="p-input-icon-left w-100">
                                <i className="pi pi-search" />
                                <InputText
                                    placeholder="Search"
                                    className="w-100"
                                />
                            </span>
                        </div>
                        <div className="d-flex">
                            <i
                                className="pi pi-comments align-self-center"
                                style={{ fontSize: "1.3rem" }}
                            ></i>
                        </div>
                    </div>
                </div>
            </div>
            {socketConnected && (
                <div className={`col-8 ${Style["chat-container"]}`}>
                    <div className="h-100 d-flex flex-column">
                        <div className="position-relative w-100 h-100">
                            <div
                                className={Style["messages-absolute-container"]}
                            >
                                <div className="d-flex flex-column-reverse">
                                    {/*----------------- MESSAGE START ---------------------- */}
                                    {allMessages.map((currentMessage, key) => {
                                        if (
                                            allMessages[
                                                allMessages.length - 1 - key
                                            ].type === MESSAGES_TYPES.ME
                                        )
                                            return (
                                                <div
                                                    className="align-self-start mb-3"
                                                    key={key}
                                                >
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            left: "20px",
                                                        }}
                                                    >
                                                        <div
                                                            className={`${Style["chat-box-me"]}`}
                                                        >
                                                            {
                                                                allMessages[
                                                                    allMessages.length -
                                                                        1 -
                                                                        key
                                                                ].message
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        else if (
                                            allMessages[
                                                allMessages.length - 1 - key
                                            ].type === MESSAGES_TYPES.OTHER
                                        )
                                            return (
                                                <div
                                                    className="align-self-end mb-3"
                                                    key={key}
                                                >
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            right: "20px",
                                                        }}
                                                    >
                                                        <div
                                                            className={`${Style["chat-box-receiver"]}`}
                                                        >
                                                            {
                                                                allMessages[
                                                                    allMessages.length -
                                                                        1 -
                                                                        key
                                                                ].message
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        else if (
                                            allMessages[
                                                allMessages.length - 1 - key
                                            ].type === MESSAGES_TYPES.TOTAL_USER
                                        )
                                            return (
                                                <div
                                                    className={`align-self-center mb-3`}
                                                    key={key}
                                                >
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        {
                                                            allMessages[
                                                                allMessages.length -
                                                                    1 -
                                                                    key
                                                            ].message
                                                        }
                                                    </div>
                                                </div>
                                            );
                                        return <div>Something wrong</div>;
                                    })}
                                    {/*----------------- MESSAGE END ---------------------- */}
                                </div>
                            </div>
                        </div>
                        <div className={`mt-2 ${Style["message-container"]}`}>
                            <InputText
                                value={currentMessage}
                                onChange={(e) =>
                                    setCurrentMessage(e.target.value)
                                }
                                onKeyDown={currentMessageHandler}
                                placeholder="Enter your message..."
                                className="w-100"
                            />
                        </div>
                    </div>
                </div>
            )}
            {!socketConnected && (
                <div className="col-8 d-flex justify-content-center">
                    <div className="align-self-center">
                        Not connected with server, Please check your Internet
                        and try again
                    </div>
                </div>
            )}
        </div>
    );
};
export default Chat;
