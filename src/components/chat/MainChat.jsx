import React, { useEffect, useRef, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Style from "./MainChat.module.css";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/responseHandler";
import axios from "axios";
import { API } from "../../config/api/api.config";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat";
import useHeaders from "../../hooks/useHeaders";
import { socket } from "../../socket";
import ChatListStyle from "./ChatList.module.css";

export default function MainChat({ chatState }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const headers = useHeaders();
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // whenever chat messages update move chat to bottom
  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);
  // set sockets to join chat and dispatch new messages
  useEffect(() => {
    function onPrivateMessageReceived(m, chat_id) {
      console.log("Message received new");
      if (chat_id === chatState.currentChat) dispatch(chatActions.newMessage(m));
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
  // when enter is pressed send message dispatch message
  const currentMessageHandler = async (e) => {
    if (e.key !== "Enter" || e.shiftKey || !currentMessage.trim()) return;
    // console.log(currentMessage);
    await commonMessageHandler();
  };
  const onSendMessageHandler = async () => {
    if (!currentMessage.trim()) return;
    await commonMessageHandler();
  };
  async function commonMessageHandler() {
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
    setCurrentMessage("");
  }

  return (
    <div className={`col-8 p-0 ${Style["chat-container"]}`}>
      <div className="p-2 mb-1 chat-bars-background-color">
        <div style={{ height: "2.5rem" }} className={Style["chat-bar"]}>
          <div className={ChatListStyle["chat-list-full-name"]}>{chatState.chatReceiver}</div>
        </div>
      </div>
      <div className="h-100 d-flex flex-column">
        <div className="position-relative w-100 h-100">
          <div className={Style["messages-absolute-container"]}>
            <div className="d-flex flex-column">
              {/*----------------- MESSAGE START ---------------------- */}
              {chatState.messages.map((currentMessage, key) => {
                if (currentMessage.messageSender.id === localStorage.getItem("user_id"))
                  return (
                    <div className="align-self-start mb-3" key={key}>
                      <div className={Style["chat-box-me-container"]}>
                        <div className={Style["chat-box-me"]}>{currentMessage.content}</div>
                      </div>
                    </div>
                  );
                else if (currentMessage.messageSender.id !== localStorage.getItem("user_id"))
                  return (
                    <div className="align-self-end mb-3" key={key}>
                      <div className={Style["chat-box-receiver-container"]}>
                        <div className={Style["chat-box-receiver"]}>{currentMessage.content}</div>
                      </div>
                    </div>
                  );
                // else if (
                //     currentMessage.messageSender
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
                //                     currentMessage.message
                //                 }
                //             </div>
                //         </div>
                //     );
                return <div>Something wrong</div>;
              })}
              <div ref={messagesEndRef} />
              {/*----------------- MESSAGE END ---------------------- */}
            </div>
          </div>
        </div>
        <div
          className={`p-2 chat-bars-background-color ${Style["message-container"]}`}
          style={{ maxHeight: "200px" }}>
          <InputTextarea
            autoResize
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={currentMessageHandler}
            placeholder="Enter your message..."
            className="w-100"
            rows={1}
            style={{ maxHeight: "180px", border: "none" }}
          />
          <i
            className={`pi pi-send ms-2 ${Style["send-message-icon"]}`}
            onClick={onSendMessageHandler}
          />
        </div>
      </div>
    </div>
  );
}
