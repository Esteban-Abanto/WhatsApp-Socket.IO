import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addNewMessage } from '../../redux/reducers/chatReducer';

import { emitMessage } from '../../services/Sockets/socketApi';

import IMessage from '../../interfaces/IMessage';

function ChatInputs() {

    const currentChatID = useAppSelector((state) => state.chatReducer.currentChatID);
    const myId = useAppSelector((state) => state.userReducer.myInfo.id);

    const [txtMessage, setTxtMessage] = useState('');

    const dispatch = useAppDispatch();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {

        if (txtMessage.trim() === '') return;

        const message: IMessage = {
            recipient: currentChatID,
            senderId: myId,
            text: txtMessage.trim(),
        };
        
        dispatch(addNewMessage(message));
        emitMessage(message);

        setTxtMessage('');
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
                    value={txtMessage}
                    onChange={(e) => setTxtMessage(e.target.value)}
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