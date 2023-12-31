import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInputs from './ChatInputs';

import IChat from '../interfaces/IChat';

interface CurrentChatProps {
    chatInfo?: IChat;
    onSendMessage: (message: string) => void;
    onClickName: (userId: string) => void;
}

function CurrentChat({ chatInfo, onSendMessage, onClickName }: CurrentChatProps) {

    return (
        <div className="flex-fill border-start">
            <div className="d-flex flex-column w-100 h-100">

                {chatInfo && (
                    <>
                        <ChatHeader title={chatInfo.title} />
                        <ChatMessages messages={chatInfo.messages} onClickName={onClickName} />
                        <ChatInputs onSendMessage={onSendMessage} />
                    </>
                )}

            </div>
        </div>
    );
}

export default CurrentChat;