import { CSSProperties } from "react";
import "./RowMessage.css";

import { getCurrentTime } from '../../utils/timeUtils'
import IMessage from '../../interfaces/IMessage'

interface MessageProps {
    message: IMessage;
    onClickName: (userId: string) => void;
}

function RowMessage({ message, onClickName }: MessageProps) {

    const { sender, text } = message;

    const styleRow: CSSProperties = sender == null ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
    const style: CSSProperties = sender == null ? { backgroundColor: '#005c4b' } : { backgroundColor: '#202c33' };

    const handlerClickName = () => {
        if(!sender) return;
        if(!sender.ID) return;

        onClickName(sender.ID);
    };

    return (
        <div className="row-message" style={styleRow}>
            <div className="bubble-message" style={style}>

                {sender && (
                    <div className="sender">
                        <span role="button" onClick={handlerClickName}>{sender.userName}</span>
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