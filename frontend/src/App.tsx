import { useEffect } from 'react'

import UserHeader from "./components/UserHeader";
import ChatList from './components/ChatList'

import CurrentChat from './components/CurrentChat';

import IMessage from './interfaces/IMessage';
import IUser from './interfaces/IUser';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { addNewMessage } from './redux/reducers/chatReducer';
import { setUserMap, saveUser, setUserId, removeUser } from './redux/reducers/userReducer';

import { configureSocket } from './services/Sockets/socketApi';

const socket = configureSocket();

function App() {

    const chatMap = useAppSelector((state) => state.chatReducer.chatMap);
    const currentChatID = useAppSelector((state) => state.chatReducer.currentChatID);
    const dispatch = useAppDispatch();

    const onConnect = () => {
        dispatch(setUserId(socket.id));
    };

    const receiveMessage = (message: IMessage) => {
        dispatch(addNewMessage(message));
    };

    const onUpdateUserInfo = (userInfo: IUser) => {
        dispatch(saveUser(userInfo));
    };

    const initialUserMap = (users: IUser[]) => {
        dispatch(setUserMap(users));
    };

    const onUserDisconnect = (userId: string) => {
        dispatch(removeUser(userId));
    }

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('initialUserMap', initialUserMap);
        socket.on('message', receiveMessage);
        socket.on('updateUserInfo', onUpdateUserInfo);
        socket.on('onUserDisconnect', onUserDisconnect);
        return () => {
            socket.off('connect', onConnect);
            socket.off('initialUserMap', initialUserMap);
            socket.off('message', receiveMessage);
            socket.off('updateUserInfo', onUpdateUserInfo);
            socket.off('onUserDisconnect', onUserDisconnect);
        }
    }, [])

    return (
        <div className="w-100" style={{ height: "100vh", backgroundColor: "#0c1317" }}>
            <div className="bg-secondary w-100 h-100 m-auto d-flex flex-row" style={{ maxWidth: "1440px" }}>

                <div style={{ width: "480px" }}>
                    <div className="d-flex flex-column w-100 h-100" style={{ width: "480px" }}>

                        <UserHeader />
                        <ChatList />
                    </div>
                </div>

                <CurrentChat chatInfo={chatMap[currentChatID]} />
            </div>
        </div>
    );
}

export default App