import useGetApi from "../../hooks/useGetApi";
import RingsLoading from "../RingsLoading";
import StyleNewChat from "./NewChat.module.css";
import Style from "./ChatList.module.css";
export default function ChatList({ setUserChatSelected }) {
    const { response: foundChatList, isFetching: isChatFetching } = useGetApi(
        "/chat/get-my-all-chat"
    );
    return (
        <>
            {foundChatList &&
                foundChatList.map((currentChat) => (
                    <div
                        key={currentChat.id}
                        className={StyleNewChat["found-chat-list"]}
                        onClick={() => setUserChatSelected(currentChat.user_id)}
                    >
                        <div
                            style={{
                                fontWeight: "600",
                                fontFamily: "Noto Sans",
                            }}
                        >
                            {currentChat.full_name}
                        </div>
                        <div
                            className={Style["chat-list-last-message"]}
                        >
                            {currentChat.content}
                        </div>
                    </div>
                ))}
            {isChatFetching && <RingsLoading />}
        </>
    );
}
