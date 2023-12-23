import useGetApi from "../../hooks/useGetApi";
import RingsLoading from "../RingsLoading";
import Style from "./NewChat.module.css";
export default function NewChat({ setUserChatSelected }) {
    const { response: foundChatList, isFetching: isChatFetching } = useGetApi(
        "/user/get-all-dropdown"
    );
    return (
        <>
            {foundChatList &&
                foundChatList.map((currentUser) => (
                    <div
                        key={currentUser.id}
                        className={Style["found-chat-list"]}
                        onClick={() => setUserChatSelected(currentUser.id)}
                    >
                        <div>
                            {currentUser.full_name} ({currentUser.username})
                        </div>
                    </div>
                ))}
            {isChatFetching && <RingsLoading />}
        </>
    );
}
