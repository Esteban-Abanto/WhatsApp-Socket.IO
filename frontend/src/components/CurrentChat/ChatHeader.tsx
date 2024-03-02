
import { getImageUrlById } from "../../utils/utils";

interface ChatHeaderProps {
    title: string;
    imgId: number;
}

function ChatHeader({ title, imgId }: ChatHeaderProps) {

    return (
        <header className="bg-dark d-flex flex-row align-items-center px-3 py-2">

            <img
                className="rounded-circle me-3"
                alt='Chat Img'
                src={getImageUrlById(imgId, 50)}
                style={{ width: "40px" }}
            />

            <div className="flex-fill text-light">
                <span>
                    {title}
                </span>
            </div>

            <button type="button" className="btn btn-secondary">
                <i className="bi bi-info-circle"></i>
            </button>

        </header>
    );
}

export default ChatHeader;