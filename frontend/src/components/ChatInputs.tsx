import { useState } from 'react';

interface ChatInputsProps {
    onSendMessage: (message: string) => void;
}

function ChatInputs({ onSendMessage }: ChatInputsProps) {

    const [message, setMessage] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {

        if (message.trim() == '') return;

        setMessage('');
        onSendMessage(message.trim());
    };

    const handleSendImage = () => {
        alert("Coming soon");
    };

    return (
        <footer className="bg-dark d-flex flex-row align-items-center px-3 py-3">

            <div className="input-group">

                <button className="btn btn-outline-secondary" onClick={handleSendImage}>
                    <i className="bi bi-image"></i>
                </button>

                <input
                    type='text'
                    name='text-message'
                    className="form-control"
                    placeholder='Enter a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />

                <button className="btn btn-primary" onClick={handleSendMessage}>
                    <i className="bi bi-send"></i>
                </button>

            </div>

        </footer>
    );
}

export default ChatInputs;