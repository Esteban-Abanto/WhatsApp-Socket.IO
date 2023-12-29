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

interface UserInfo {
    ID?: string,
    userName: string,
    // imgUrl: string
}

interface Message {
    recipient: string,

    sender: UserInfo
    text: string
}


io.on('connection', socket => {

    console.log(`Client connected: ${socket.id}`);

    socket.on('updateUserInfo', (userInfo: UserInfo) => {

        userInfo.ID = socket.id;
        connectedClients.set(socket.id, userInfo);

        console.log(connectedClients);
    });

    socket.on('message', (message: string) => {

        // if (recipient) {

        //     // Mensaje privado
        //     if (connectedClients.has(recipient)) {

        //         socket.to(recipient).emit('message', {
        //             sender: socket.id,
        //             text,
        //         });

        //     } else {

        //         console.log(`El destinatario ${recipient} no está conectado.`);
        //         // Puedes manejar aquí la lógica para notificar al remitente que el destinatario no está conectado.
        //     }

        // } else {
        // 

        // Mensaje global
        socket.broadcast.emit('message', {
            sender: connectedClients.get(socket.id),
            message,
        });
        // }

    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        connectedClients.delete(socket.id);
    });
})

server.listen(4000, () => {
    console.log("Server on port 4000")
})