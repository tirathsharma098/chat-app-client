import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import Style from "./ChatSidebar.module.css";
import axios from "axios";
import { API } from "../../config/api/api.config";
import { toastOptions } from "../../utils/responseHandler";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat";
import NewChat from "./NewChat";
import useHeaders from "../../hooks/useHeaders";
import ChatList from "./ChatList";

export default function ChatSidebar() {
  const [showChatList, setShowChatList] = useState(true);
  const [showChatFind, setShowChatFind] = useState(false);
  const [userChatSelected, setUserChatSelected] = useState(null);
  const dispatch = useDispatch();
  const headers = useHeaders();

  useEffect(() => {
    if (!userChatSelected) return;
    setShowChatFind(() => false);
    setShowChatList(() => true);
    (async () => {
      try {
        dispatch(chatActions.set({ chatLoading: true }));
        // await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios({
          url: API.endpoint + `/chat/all-messages/${userChatSelected}`,
          ...headers,
        });
        if (response.data?.success === true)
          dispatch(
            chatActions.set({
              currentChat: response.data.data.id,
              chatName: response.data.data.chat_name,
              chatCreatedAt: response.data.data.created_at,
              chatLoading: false,
              messages: response.data.data.messages,
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
    <div className="col-4 border-end p-0" style={{ backgroundColor: "white" }}>
      {/* chat side bar start */}
      <div className="h-100 d-flex flex-column p-0">
        <div className="d-flex p-2 justify-content-between chat-bars-background-color">
          <div className="w-100 mr-5">
            {showChatList && (
              <span className="p-input-icon-left w-100">
                <i className="pi pi-search" />
                <InputText
                  placeholder="Search"
                  className={`w-100 ${Style["sidebar-search-input"]}`}
                  style={{ height: "2.5rem" }}
                />
              </span>
            )}
            {showChatFind && (
              <span className="p-input-icon-left w-100">
                <i className="pi pi-search" />
                <InputText
                  placeholder="Create new chat"
                  className={`w-100 ${Style["sidebar-search-input"]}`}
                />
              </span>
            )}
          </div>
          <div className="d-flex">
            <i
              className={`pi pi-comments align-self-center ${
                Style["new-chat-icon"]
              } ${ showChatFind ? Style["new-chat-icon-selected"] : ""}`}
              style={{ fontSize: "1.3rem" }}
              onClick={() => {
                setShowChatFind((prev) => !prev);
                setShowChatList((prev) => !prev);
              }}></i>
          </div>
        </div>
        <div>
          {showChatFind && <NewChat setUserChatSelected={setUserChatSelected} />}
          {showChatList && <ChatList setUserChatSelected={setUserChatSelected} />}
        </div>
      </div>
      {/* chat side bar end */}
    </div>
  );
}
