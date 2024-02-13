import { useRef, useEffect } from 'react';

import RowMessage from "../RowMessage/RowMessage";

import IMessage from '../../interfaces/IMessage'

interface ChatMessagesProps {
    messages: IMessage[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='flex-fill overflow-auto' style={{ backgroundColor: "#0c151b" }}>
            <div className='d-flex flex-column justify-content-end' style={{ minHeight: "100%" }}>

                {messages.map((value, index) => (
                    <RowMessage
                        key={index}
                        message={value}
                    />
                ))}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default ChatMessages