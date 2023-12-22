import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Style from "./ChatSidebar.module.css";
import RingsLoading from "../../components/RingsLoading";
import useGetApi from "../../hooks/useGetApi";
import axios from "axios";
import { API } from "../../config/api/api.config";
import { getApiHeader } from "../../config/headers/get-api-header";
import { toastOptions } from "../../utils/responseHandler";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat";

export default function ChatSidebar() {
    const [showChatList, setShowChatList] = useState(true);
    const [showChatFind, setShowChatFind] = useState(false);
    const [userChatSelected, setUserChatSelected] = useState(null);
    const dispatch = useDispatch();
    const { response: foundChatList, isFetching: isChatFetching } = useGetApi(
        "/user/get-all-dropdown"
    );
    useEffect(() => {
        if (!userChatSelected) return;
        (async () => {
            try {
                dispatch(chatActions.set({ chatLoading: true }));
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const response = await axios.post(
                    API.endpoint + `/chat/create-new-chat/${userChatSelected}`,
                    {},
                    {
                        ...getApiHeader,
                    }
                );
                if (response.data?.success === true)
                    dispatch(
                        chatActions.set({
                            currentChat: response.data.data.id,
                            chatName: response.data.data.chat_name,
                            chatCreatedAt: response.data.data.created_at,
                            chatLoading: false,
                        })
                    );
                dispatch(chatActions.set({ chatLoading: false }));
            } catch (err) {
                dispatch(chatActions.set({ chatLoading: false }));
                toast.error("Something went wrong", toastOptions);
            }
        })();
    }, [userChatSelected]);
    return (
        <div
            className="col-4 border-end p-0"
            style={{ backgroundColor: "white" }}
        >
            {/* chat side bar start */}
            <div className="h-100 d-flex flex-column p-0">
                <div
                    className="d-flex p-3 justify-content-between"
                    style={{ backgroundColor: "#f0f2f5" }}
                >
                    <div className="w-100 mr-5">
                        {showChatList && (
                            <span className="p-input-icon-left w-100">
                                <i className="pi pi-search" />
                                <InputText
                                    placeholder="Search"
                                    className="w-100"
                                />
                            </span>
                        )}
                        {showChatFind && (
                            <span className="p-input-icon-left w-100">
                                <i className="pi pi-search" />
                                <InputText
                                    placeholder="Create new chat"
                                    className="w-100"
                                />
                            </span>
                        )}
                    </div>
                    <div className="d-flex">
                        <i
                            className={`pi pi-comments align-self-center ${Style["new-chat-icon"]}`}
                            style={{ fontSize: "1.3rem" }}
                            onClick={() => {
                                setShowChatFind((prev) => !prev);
                                setShowChatList((prev) => !prev);
                            }}
                        ></i>
                    </div>
                </div>
                <div>
                    {showChatFind &&
                        foundChatList &&
                        foundChatList.map((currentUser) => (
                            <div
                                key={currentUser.id}
                                className={Style["found-chat-list"]}
                                onClick={() =>
                                    setUserChatSelected(currentUser.id)
                                }
                            >
                                <div>
                                    {currentUser.full_name} (
                                    {currentUser.username})
                                </div>
                            </div>
                        ))}
                    {showChatFind && isChatFetching && <RingsLoading />}
                </div>
            </div>
            {/* chat side bar end */}
        </div>
    );
}
