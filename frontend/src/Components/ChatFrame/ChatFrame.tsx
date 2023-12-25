import { useState } from 'react'

import Message from '../../interfaces/Message'

import "./ChatFrame.css";

interface ChatData {
    title: string,
    messages: Message[]
}

interface ChatFrameProps {
    onSetChat: (chat: ChatData) => void;
}

// function ChatFrame({ onSetChat }: ChatFrameProps) {
function ChatFrame() {

    const imageUrl = 'https://picsum.photos/50';

    const [amount, setAmount] = useState(2);

    const handleClick = () => {
        console.log("click Frame");
        setAmount(0);
    }

    return (
        <div className="chat-frame" onClick={handleClick}>
            <div className="chat-frame-cont-img">
                <img className="chat-frame-img" src={imageUrl} alt="Img" />
            </div>
            <div className="chat-frame-info">

                <div className="chat-frame-first-line">
                    <div className="chat-frame-name name-new-message">
                        Jesus Campos
                    </div>
                    <div className="chat-frame-date date-new-message">
                        <span>1:13 p. m.</span>
                    </div>
                </div>

                <div className="chat-frame-first-line">

                    <div className="chat-frame-message">
                        Menos mal me avisaste cholo, gracias :,v mejor lo traigo de Amazon
                    </div>

                    {amount !== 0 && (
                        <div className="chat-frame-cont-number">
                            <div className="chat-frame-number">
                                <span>
                                    {amount}
                                </span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default ChatFrame