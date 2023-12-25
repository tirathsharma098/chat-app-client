import useGetApi from "../../hooks/useGetApi";
import RingsLoading from "../RingsLoading";
import StyleNewChat from "./NewChat.module.css";
import Style from "./ChatList.module.css";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/chat";
export default function ChatList({ setUserChatSelected }) {
  const dispatch = useDispatch();
  const { response: foundChatList, isFetching: isChatFetching } =
    useGetApi("/chat/get-my-all-chat");
  function setCurrentChatHandler(currentChat) {
    dispatch(
      chatActions.set({
        chatReceiver: currentChat?.full_name,
      })
    );
    setUserChatSelected(currentChat.user_id);
  }
  return (
    <>
      {foundChatList &&
        foundChatList.map((currentChat) => (
          <div
            key={currentChat.id}
            className={StyleNewChat["found-chat-list"]}
            onClick={() => setCurrentChatHandler(currentChat)}>
            <div
            className={Style['chat-list-full-name']}>
              {currentChat.full_name}
            </div>
            <div className={Style["chat-list-last-message"]}>{currentChat.content}</div>
          </div>
        ))}
      {isChatFetching && <RingsLoading />}
    </>
  );
}
