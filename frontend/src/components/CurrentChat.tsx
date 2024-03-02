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

    const getChatImgId = (chatId: string) => {
        if (chatId === "global") return 1;
        return userMap[chatId]?.imgId || 0;
    }

    const getChatTitle = (chatId: string) => {
        if (chatId === "global") return "Chat Global";
        return userMap[chatId]?.userName || "User disconnected";
    }

    return (
        <div className="flex-fill border-start">
            <div className="d-flex flex-column w-100 h-100">

                {chatInfo && (
                    <>
                        <ChatHeader title={getChatTitle(id)} imgId={getChatImgId(id)} />
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