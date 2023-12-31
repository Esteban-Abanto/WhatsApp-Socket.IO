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

import IUser from './interfaces/IUser';
import IMessage from './interfaces/IMessage';

io.on('connection', socket => {

    console.log(`Client connected: ${socket.id}`);

    socket.on('updateUserInfo', (userInfo: IUser) => {

        userInfo.ID = socket.id;
        connectedClients.set(socket.id, userInfo);

        console.log(connectedClients);
    });

    socket.on('message', (message: IMessage) => {

        const { recipient, text } = message;

        console.log(recipient, text);

        if (recipient !== 'global') {

            // Mensaje privado

            if (connectedClients.has(recipient)) {

                console.log(message);

                socket.to(recipient).emit('message', {
                    recipient: socket.id,
                    sender: connectedClients.get(socket.id),
                    text,
                });

            } else {
                console.log(`El destinatario ${recipient} no está conectado.`);
                // Puedes manejar aquí la lógica para notificar al remitente que el destinatario no está conectado.
            }

        } else {

            // Mensaje global
            socket.broadcast.emit('message', {
                recipient,
                sender: connectedClients.get(socket.id),
                text,
            });
        }

        // if (recipient) {

        //     // Mensaje privado
        //     if (connectedClients.has(recipient)) {

        //         socket.to(recipient).emit('message', {
        //             sender: socket.id,
        //             text,
        //         });

        //     } 

    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        connectedClients.delete(socket.id);
    });
})

server.listen(4000, () => {
    console.log("Server on port 4000")
})