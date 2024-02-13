import { useAppSelector } from '../redux/hooks';

import ChatHeader from './CurrentChat/ChatHeader';
import ChatMessages from './CurrentChat/ChatMessages';
import ChatInputs from './CurrentChat/ChatInputs';
import DisconnectedMessage from "./CurrentChat/DisconnectedMessage";

import IChat from '../interfaces/IChat';

interface CurrentChatProps {
    chatInfo: IChat;
}

function CurrentChat({ chatInfo }: CurrentChatProps) {

    const { id, messages } = chatInfo;
    const userMap = useAppSelector((state) => state.userReducer.userMap);

    const getChatTitle = () => {
        if (id === "global") return "Chat Global";
        return userMap[id]?.userName || "User disconnected";
    }

    return (
        <div className="flex-fill border-start">
            <div className="d-flex flex-column w-100 h-100">

                {chatInfo && (
                    <>
                        <ChatHeader title={getChatTitle()} />
                        <ChatMessages messages={messages} />

                        {(userMap[id] || id === "global") && (
                            <ChatInputs />
                        )}

                        {!userMap[id] && id !== "global" && (
                            <DisconnectedMessage />
                        )}
                    </>
                )}

            </div>
        </div>
    );
}

export default CurrentChat;