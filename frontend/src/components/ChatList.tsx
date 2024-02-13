import { useAppSelector } from './../redux/hooks';

import ChatFrame from './ChatFrame/ChatFrame';

function ChatList() {

    const chatMap = useAppSelector((state) => state.chatReducer.chats);
    const chatIds  = Object.keys(chatMap);

    return (

        <div className="flex-fill overflow-auto">
            <div style={{ minHeight: "100%" }}>

                {chatIds.map((chatId, index) => (

                    <ChatFrame key={index} chatId={chatId} />

                ))}

            </div>
        </div>
    );
}

export default ChatList;