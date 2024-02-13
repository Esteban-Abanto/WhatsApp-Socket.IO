import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const connectedClients = new Map();

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

import IUser from './interfaces/IUser';
import IMessage from './interfaces/IMessage';

io.on(EVENTS.CONNECTION, socket => {

    console.log(`Client connected: ${socket.id}`);

    // Enviar el userMap actual al cliente cuando se conecta
    socket.emit(EVENTS.INITIAL_USER_MAP, Array.from(connectedClients.values()));

    socket.on('updateUserInfo', (userInfo: IUser) => {

        connectedClients.set(socket.id, userInfo);
        console.log(connectedClients);

        socket.broadcast.emit('updateUserInfo', userInfo);
    });

    socket.on(EVENTS.MESSAGE, (message: IMessage) => {

        const { recipient, text } = message;

        console.log(recipient, text);

        if (recipient !== 'global') {

            // Mensaje privado
            if (connectedClients.has(recipient)) {

                socket.to(recipient).emit(EVENTS.MESSAGE, {
                    recipient: socket.id,
                    senderId: socket.id,
                    text,
                });

            } else {
                console.log(`El destinatario ${recipient} no está conectado.`);
                // Puedes manejar aquí la lógica para notificar al remitente que el destinatario no está conectado.
            }

        } else {

            // Mensaje global
            socket.broadcast.emit(EVENTS.MESSAGE, {
                recipient,
                senderId: socket.id,
                text,
            });
        }
    });

    socket.on(EVENTS.DISCONNECT, () => {
        console.log(`Client disconnected: ${socket.id}`);
        socket.broadcast.emit(EVENTS.ON_USER_DISCONNECT, socket.id);
        connectedClients.delete(socket.id);
    });
})

server.listen(4000, () => {
    console.log("Server on port 4000")
})