import ChatFrame from './ChatFrame/ChatFrame'

import IChat from '../interfaces/IChat'

interface ChatListProps {
    chatMap: { [key: string]: IChat };
    onClickChat: (chatId: string) => void;
}

function ChatList({ chatMap, onClickChat }: ChatListProps) {

    const chatIds  = Object.keys(chatMap);

    return (

        <div className="flex-fill overflow-auto">
            <div style={{ minHeight: "100%" }}>

                {chatIds.map((chatId, index) => (

                    <ChatFrame key={index} chatInfo={chatMap[chatId]} onClickChat={onClickChat} />

                ))}

            </div>
        </div>
    );
}

export default ChatList;