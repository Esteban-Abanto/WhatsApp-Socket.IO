import { getCurrentTime } from '../../utils/timeUtils'

import { useAppDispatch } from '../../redux/hooks';
import { setCurrentChatID, resetUnreadMessages } from '../../redux/reducers/chatReducer';

import { getImageUrlById } from "../../utils/utils";

import "./ChatFrame.css";

interface ChatFrameProps {
    chatId: string;
    title: string;
    imgId: number;
    unreadMessages: number;
    lastMessage: string;
}

function ChatFrame({ chatId, title, imgId, unreadMessages, lastMessage }: ChatFrameProps) {

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setCurrentChatID(chatId));
        dispatch(resetUnreadMessages(chatId));
    }

    return (
        <div className="chat-frame" onClick={handleClick}>

            <div className="chat-frame-cont-img">
                <img className="chat-frame-img" src={getImageUrlById(imgId, 80)} alt="Img" />
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

                    {unreadMessages !== 0 && (
                        <div className="chat-frame-cont-number">
                            <div className="chat-frame-number">
                                <span>
                                    {unreadMessages}
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