import "./ChatHeader.css";

interface ChatHeaderProps {
    data: {
        imgUrl: string;
        title: string;
    }
}

function ChatHeader(props: ChatHeaderProps) {

    const { imgUrl, title } = props.data;

    return (
        <header className="chat-header">
            <img className="chat-header-img" src={imgUrl} alt="Img" />
            <div className="chat-header-title">
                <span> {title} </span>
            </div>
            <div className="chat-header-ctrls">

            </div>
        </header>
    );
}

export default ChatHeader;