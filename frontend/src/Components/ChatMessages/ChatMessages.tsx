import RowMessage from "../RowMessage/RowMessage";

import Message from '../../interfaces/Message'

interface ChatMessagesProps {
    messages: Message[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
    return (
        <div className='flex-fill overflow-auto' style={{ backgroundColor: "#0c151b" }}>
            <div className='d-flex flex-column justify-content-end' style={{ minHeight: "100%" }}>
                
                {messages.map((data, index) => (
                    <RowMessage
                        key={index}
                        data={data}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatMessages