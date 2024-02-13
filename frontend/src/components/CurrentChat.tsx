import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInputs from './CurrentChat/ChatInputs';
import DisconnectedMessage from "./CurrentChat/DisconnectedMessage";

import IChat from '../interfaces/IChat';

interface CurrentChatProps {
    chatInfo?: IChat;
}

function CurrentChat({ chatInfo }: CurrentChatProps) {

    return (
        <div className="flex-fill border-start">
            <div className="d-flex flex-column w-100 h-100">

                {chatInfo && (
                    <>
                        <ChatHeader chatId={chatInfo.id} />
                        <ChatMessages messages={chatInfo.messages} />


                        <ChatInputs />
                        <DisconnectedMessage />
                    </>
                )}

            </div>
        </div>
    );
}

export default CurrentChat;