import { useState } from 'react';

import "./ChatInputs.css";

interface ChatInputsProps {
    onSendMessage: (message: string) => void;
}

function ChatInputs({ onSendMessage }: ChatInputsProps) {

    const [message, setMessage] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    const handleClick = () => {
        if (message.trim() !== '') {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <footer className="chat-inputs">

            <div className="chat-inputs-ctrls">

            </div>

            <input
                className="form-control field-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                type="text"
            />

            <button onClick={handleClick} type="submit" className="btn btn-primary btn-send">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
            </button>

        </footer>
    );
}

export default ChatInputs;