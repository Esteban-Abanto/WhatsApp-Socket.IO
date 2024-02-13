import { useState } from 'react'

import { getCurrentTime } from '../../utils/timeUtils'

import { useAppDispatch } from '../../redux/hooks';
import { setCurrentChatID } from '../../redux/reducers/chatReducer';

import "./ChatFrame.css";

interface ChatFrameProps {
    chatId: string;
    title: string;
    lastMessage: string;
}

function ChatFrame({ chatId, title, lastMessage }: ChatFrameProps) {

    const imgUrl = 'https://picsum.photos/80';

    const [amount, setAmount] = useState(20);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setCurrentChatID(chatId));
        setAmount(0);
    }

    return (
        <div className="chat-frame" onClick={handleClick}>

            <div className="chat-frame-cont-img">
                <img className="chat-frame-img" src={imgUrl} alt="Img" />
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
                        {lastMessage}
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