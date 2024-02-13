import { useState } from 'react'

import { getCurrentTime } from '../../utils/timeUtils'

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setCurrentChatID } from '../../redux/reducers/chatReducer';

import "./ChatFrame.css";

interface ChatFrameProps {
    chatId: string;
}

function ChatFrame({ chatId }: ChatFrameProps) {

    const userMap = useAppSelector((state) => state.userReducer.userMap);

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
                        {chatId === "global" ? "Chat Global" : (userMap[chatId]?.userName || "User disconnected")}
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