import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import UserHeader from "./components/UserHeader";
import ChatFrame from "./components/ChatFrame/ChatFrame";
import ChatHeader from "./components/ChatHeader/ChatHeader";
import ChatMessages from "./components/ChatMessages/ChatMessages";
import ChatInputs from "./components/ChatInputs/ChatInputs";

import Message from './interfaces/Message'
import UserInfo from './interfaces/UserInfo'

const socket = io("http://localhost:4000");

function App() {

    const imageUrl = 'https://picsum.photos/100';
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSetUserInfo = (info: UserInfo) => {
        socket.emit('updateUserInfo', info);
    }

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

                        <UserHeader onSetUserInfo={handleSetUserInfo} />
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