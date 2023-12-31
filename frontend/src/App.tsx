import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import UserHeader from "./components/UserHeader";
import ChatList from './components/ChatList'

import CurrentChat from './components/CurrentChat';

import IMessage from './interfaces/IMessage'
import IUser from './interfaces/IUser'
import IChat from './interfaces/IChat'

const socket = io("http://localhost:4000");

function App() {

    const [currentChatID, setCurrentChatID] = useState<string>('global');

    const [chatMap, setChatMap] = useState<{ [key: string]: IChat }>({
        'global': {
            ID: "global",
            title: "Chat Global",
            messages: []
        }
    });
    // const [chatMap, setChatMap] = useState<Map<string, IChat>>(
    //     new Map<string, IChat>([['global', {
    //         ID: "global",
    //         title: "Chat Global",
    //         messages: []
    //     }]])
    // );

    const addNewMessage = (chatId: string, message: IMessage) => {

        // const updatedChatMap = { ...chatMap };
        
        // if (!updatedChatMap[chatId]) {
        //     console.log("New Chat created");
        //     updatedChatMap[chatId] = { ID: chatId, title: chatId, messages: [] };
        // }

        // updatedChatMap[chatId].messages.push(message);

        // setChatMap(updatedChatMap);


        setChatMap(prevChatMap => {
            const updatedChatMap = { ...prevChatMap };
            if (!updatedChatMap[chatId]) {
                updatedChatMap[chatId] = { ID: chatId, title: chatId, messages: [] };
            }

            // updatedChatMap[chatId].messages.push(message);

            updatedChatMap[chatId] = {
                ...updatedChatMap[chatId],
                messages: [...updatedChatMap[chatId].messages, message],
            };
            
            return updatedChatMap;
        });


        // let chat = chatMap.get(chatId);

        // if (!chat) {
        //     console.log("nuevo chat creado");

        //     chat = {
        //         ID: chatId,
        //         title: chatId,
        //         messages: []
        //     }
        // }

        // chat.messages = [...chat.messages, message];
        // setChatMap(prevChatMap => new Map(prevChatMap.set(chatId, chat as IChat)));
    };

    const handleSendMessage = (textMessage: string) => {

        const myMessage: IMessage = {
            recipient: currentChatID,
            text: textMessage,
        };

        addNewMessage(currentChatID, myMessage);
        socket.emit('message', myMessage);
    };

    const handleClickName = (userId: string) => {
        const chat: IChat = {
            ID: userId,
            title: userId,
            messages: []
        }

        setChatMap(prevChatMap => ({ ...prevChatMap, [userId]: chat }));
        setCurrentChatID(userId);
    };

    const receiveMessage = (message: IMessage) => {
        console.log("Received Message");
        console.log(chatMap[message.recipient]);
        
        addNewMessage(message.recipient, message);
    };

    const handleSetUserInfo = (info: IUser) => {
        socket.emit('updateUserInfo', info);
    };

    const handlerTesting = () => {
        console.log(currentChatID);
        console.log(chatMap);
    }

    useEffect(() => {
        console.log("Holi");

        socket.on('message', receiveMessage);
        return () => {
            socket.off('message', receiveMessage);
        }
    }, [])

    return (
        <div className="w-100" style={{ height: "100vh", backgroundColor: "#0c1317" }}>
            <div className="bg-secondary w-75 h-100 m-auto d-flex flex-row">

                <div style={{ width: "480px" }}>
                    <div className="d-flex flex-column w-100 h-100" style={{ width: "480px" }}>

                        <UserHeader onSetUserInfo={handleSetUserInfo} />
                        <ChatList chatMap={chatMap} onClickChat={setCurrentChatID} />
                        <button className='btn btn-primary' onClick={handlerTesting}> Hola </button>

                    </div>
                </div>

                <CurrentChat chatInfo={chatMap[currentChatID]} onSendMessage={handleSendMessage} onClickName={handleClickName} />
                {/* <CurrentChat chatInfo={chatMap.get(currentChatID)} onSendMessage={handleSendMessage} onClickName={handleClickName} /> */}
            </div>
        </div>
    );
}

export default App