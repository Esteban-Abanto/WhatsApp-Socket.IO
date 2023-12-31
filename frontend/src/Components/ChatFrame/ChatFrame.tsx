import { useState } from 'react'

import { getCurrentTime } from '../../utils/timeUtils'

import IChat from '../../interfaces/IChat'

import "./ChatFrame.css";

interface ChatFrameProps {
    chatInfo: IChat;
    onClickChat: (chatId: string) => void;
}

function ChatFrame({ chatInfo, onClickChat }: ChatFrameProps) {

    const { ID: id, title } = chatInfo;

    const imageUrl = 'https://picsum.photos/80';

    const [amount, setAmount] = useState(20);

    const handleClick = () => {
        onClickChat(id);
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
                        {title}
                    </div>
                    <div className="chat-frame-date date-new-message">
                        <span>{getCurrentTime()}</span>
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

export default ChatFrame;