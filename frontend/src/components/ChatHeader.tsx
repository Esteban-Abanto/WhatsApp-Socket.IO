
interface ChatHeaderProps {
    title: string;
}

function ChatHeader({ title }: ChatHeaderProps) {

    const imgUrl = 'https://picsum.photos/id/0/50';

    return (
        <header className="bg-dark d-flex flex-row align-items-center px-3 py-2">

            <img className="rounded-circle me-3" src={imgUrl} style={{ width: "40px" }} />

            <div className="flex-fill text-light">
                <span> {title} </span>
            </div>

            <button type="button" className="btn btn-secondary">
                <i className="bi bi-info-circle"></i>
            </button>

        </header>
    );
}

export default ChatHeader;