import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import UserHeader from "./Components/UserHeader/UserHeader";
import ChatFrame from "./Components/ChatFrame/ChatFrame";
import ChatHeader from "./Components/ChatHeader/ChatHeader";
import ChatMessages from "./Components/ChatMessages/ChatMessages";
import ChatInputs from "./Components/ChatInputs/ChatInputs";

import Message from './interfaces/Message'

const socket = io("http://localhost:4000");

function App() {

    const imageUrl = 'https://picsum.photos/100';

    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (message: string) => {

        const myMessage: Message = {
            message,
        };
        setMessages([...messages, myMessage]);
        socket.emit('message', message);
    };

    useEffect(() => {
        socket.on('message', receiveMessage);
        return () => {
            socket.off('message', receiveMessage);
        }
    }, [])

    const receiveMessage = (data: Message) => setMessages((state) => [...state, data]);

    return (
        <div className="w-100" style={{ height: "100vh", backgroundColor: "#0c1317" }}>
            <div className="bg-secondary h-100 m-auto d-flex flex-row" style={{ width: "1600px" }}>

                <div className="" style={{ width: "480px" }}>
                    <div className="d-flex flex-column w-100 h-100" style={{ width: "480px" }}>

                        <UserHeader data={{ imgUrl: imageUrl, name: "Jesus Campos" }} />

                        <div className="d-flex align-items-center flex-row" style={{ height: "50px", padding: "10px 16px" }}>
                            <div style={{ height: "50px" }}> Busqueda </div>
                        </div>

                        <div className="flex-fill overflow-auto">
                            <div id='ChatList' className="" style={{ minHeight: "100%" }}>

                                <ChatFrame />
                                <ChatFrame />
                                <ChatFrame />
                                <ChatFrame />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex-fill border-start">
                    <div className="d-flex flex-column w-100 h-100">

                        <ChatHeader data={{ imgUrl: imageUrl, title: "Chat Global" }} />
                        <ChatMessages messages={messages} />
                        <ChatInputs onSendMessage={handleSendMessage} />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App