import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Style from "./MainChat.module.css";
import { MESSAGES_TYPES } from "../../utils/constants";

export default function MainChat({ socket }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [allMessages, setAllMessages] = useState([
        { type: MESSAGES_TYPES.ME, message: "hi" },
        { type: MESSAGES_TYPES.OTHER, message: "by" },
    ]);
    useEffect(() => {
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

    return (
        <div className={`col-8 ${Style["chat-container"]}`}>
            <div className="h-100 d-flex flex-column">
                <div className="position-relative w-100 h-100">
                    <div className={Style["messages-absolute-container"]}>
                        <div className="d-flex flex-column-reverse">
                            {/*----------------- MESSAGE START ---------------------- */}
                            {allMessages.map((currentMessage, key) => {
                                if (
                                    allMessages[allMessages.length - 1 - key]
                                        .type === MESSAGES_TYPES.ME
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
                                    allMessages[allMessages.length - 1 - key]
                                        .type === MESSAGES_TYPES.OTHER
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
                                    allMessages[allMessages.length - 1 - key]
                                        .type === MESSAGES_TYPES.TOTAL_USER
                                )
                                    return (
                                        <div
                                            className={`align-self-center mb-3`}
                                            key={key}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
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
