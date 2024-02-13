import { CSSProperties } from "react";
import "./RowMessage.css";

import { getCurrentTime } from '../../utils/timeUtils';
import IMessage from '../../interfaces/IMessage';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { createChat } from '../../redux/reducers/chatReducer';

function RowMessage({ message }: { message: IMessage }) {

    const myId = useAppSelector((state) => state.userReducer.myInfo.id);
    const userMap = useAppSelector((state) => state.userReducer.userMap);

    const { senderId, text } = message;

    const styleRow: CSSProperties = senderId === myId ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
    const style: CSSProperties = senderId === myId ? { backgroundColor: '#005c4b' } : { backgroundColor: '#202c33' };

    const dispatch = useAppDispatch();

    const handlerClickName = () => {
        if (!userMap[senderId]) return;
        dispatch(createChat(senderId));
    };

    const getUserName = () => {

        if (!userMap[senderId]) {
            return "User disconnected";
        }

        return userMap[senderId].userName;
    }

    return (
        <div className="row-message" style={styleRow}>
            <div className="bubble-message" style={style}>

                {senderId !== myId && (
                    <div className="sender">
                        <span role="button" onClick={handlerClickName}>{getUserName()}</span>
                    </div>
                )}

                <div className="message">
                    <span className="text">{text}</span>
                    <div className="extra">{getCurrentTime()}</div>
                </div>

                <div className="time">
                    <div>{getCurrentTime()}</div>
                </div>
            </div>
        </div>
    );
}

export default RowMessage;