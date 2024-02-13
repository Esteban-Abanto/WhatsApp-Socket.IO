import { useAppSelector } from '../redux/hooks';

interface ChatHeaderProps {
    chatId: string;
}

function ChatHeader({ chatId }: ChatHeaderProps) {

    const userMap = useAppSelector((state) => state.userReducer.userMap);

    const imgUrl = 'https://picsum.photos/id/0/50';

    return (
        <header className="bg-dark d-flex flex-row align-items-center px-3 py-2">

            <img
                className="rounded-circle me-3"
                alt='Chat Img'
                src={imgUrl}
                style={{ width: "40px" }}
            />

            <div className="flex-fill text-light">
                <span>
                    {chatId === "global" ? "Chat Global" : (userMap[chatId]?.userName || "User disconnected")}
                </span>
            </div>

            <button type="button" className="btn btn-secondary">
                <i className="bi bi-info-circle"></i>
            </button>

        </header>
    );
}

export default ChatHeader;