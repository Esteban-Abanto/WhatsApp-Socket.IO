import RowMessage from "../RowMessage/RowMessage";

interface ChatMessagesProps {
    messages: {
        sender?: string;
        message: string
    }[];
}

function ChatMessages({ messages }: ChatMessagesProps) {
    return (
        <div className='flex-fill overflow-auto' style={{ backgroundColor: "#0c151b" }}>
            <div className='d-flex flex-column justify-content-end' style={{ minHeight: "100%" }}>
                
                {/* <RowMessage
                    data={{
                        sender: 'Jesus Campos',
                        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
                    }}
                />
                <RowMessage
                    data={{
                        message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, hic laboriosam fugiat esse dolorum illum soluta neque est at, officiis temporibus eaque. Corrupti quas debitis commodi sit assumenda animi dolor?'
                    }}
                /> */}

                {messages.map((data, index) => (
                    <RowMessage
                        key={index}
                        data={data}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatMessages