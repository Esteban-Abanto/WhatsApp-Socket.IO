import { CSSProperties } from "react";
import "./RowMessage.css";

import { getCurrentTime } from '../../utils/timeUtils'

interface MessageProps {
    data: {
        sender?: string;
        message: string;
    };
}

function RowMessage(props: MessageProps) {

    const { sender, message } = props.data;

    const styleRow: CSSProperties = sender == null ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
    const style: CSSProperties = sender == null ? { backgroundColor: '#005c4b' } : { backgroundColor: '#202c33' };

    return (
        <div className="row-message" style={styleRow}>
            <div className="bubble-message" style={style}>

                {sender && (
                    <div className="sender">
                        <span>{sender}</span>
                    </div>
                )}

                <div className="message">
                    <span className="text">{message}</span>
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