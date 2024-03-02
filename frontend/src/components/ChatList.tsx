import { useAppSelector } from './../redux/hooks';

import ChatFrame from './ChatFrame/ChatFrame';

function ChatList() {

    const chatMap = useAppSelector((state) => state.chatReducer.chatMap);
    const userMap = useAppSelector((state) => state.userReducer.userMap);

    const chatIds = Object.keys(chatMap);

    const getChatImgId = (chatId: string) => {
        if (chatId === "global") return 1;
        return userMap[chatId]?.imgId || 0;
    }

    const getChatTitle = (chatId: string) => {
        if (chatId === "global") return "Chat Global";
        return userMap[chatId]?.userName || "User disconnected";
    }

    const getLastMessage = (chatId: string) => {
        const messages = chatMap[chatId].messages;
        return messages[messages.length - 1]?.text
    }

    return (

        <div className="flex-fill overflow-auto">
            <div style={{ minHeight: "100%" }}>

                {chatIds.map((chatId, index) => (

                    <ChatFrame
                        key={index}
                        chatId={chatId}
                        imgId={getChatImgId(chatId)}
                        title={getChatTitle(chatId)}
                        lastMessage={getLastMessage(chatId)}
                        unreadMessages={chatMap[chatId].unreadMessages}
                    />
                ))}

            </div>
        </div>
    );
}

export default ChatList;