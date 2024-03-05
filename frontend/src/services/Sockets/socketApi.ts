import io, { Socket } from 'socket.io-client';

import IUser from "../../interfaces/IUser";
import IMessage from "../../interfaces/IMessage";

const URL_SERVER: string = '/';

// Constantes para los eventos
const EVENTS = {
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',

    MESSAGE: 'message',
    UPDATE_USER_INFO: 'updateUserInfo',

    INITIAL_USER_MAP: 'initialUserMap',
    UPDATED_USER_MAP: 'updatedUserMap',

    ON_USER_DISCONNECT: 'onUserDisconnect'
};

let socket: Socket;

export const configureSocket = () => {

    if (!socket) {
        socket = io(URL_SERVER); // URL del servidor de sockets
    }

    return socket;
};

export const emitMessage = (message: IMessage) => {
    socket.emit('message', message);
};

export const updateUserInfo = (userInfo: IUser) => {
    socket.emit(EVENTS.UPDATE_USER_INFO, userInfo);
}