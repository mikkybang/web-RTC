import express, { Application, Request, Response, NextFunction } from "express";
import path from 'path'
import { createServer, Server as HTTPServer } from 'http'
import SocketIO, { Server as SocketIOServer } from "socket.io"

const app: Application = express()
const server: HTTPServer = createServer(app)
const io: SocketIOServer = SocketIO(server)

var activeSockets: String[] = [];

io.on("connection", (socket) => {
    console.log("Socket connected")

    const existingSocket = activeSockets.find(
        existingSocket => existingSocket === socket.id
    );

    if (!existingSocket) {
        activeSockets.push(socket.id);

        socket.emit("update-user-list", {
            users: activeSockets.filter(
                existingSocket => existingSocket !== socket.id
            )
        });

        socket.broadcast.emit("update-user-list", {
            users: [socket.id]
        });
    }


    socket.on("call-user", data => {
        socket.to(data.to).emit("call-made", {
            offer: data.offer,
            socket: socket.id
        });
    });

    socket.on("disconnect", () => {
        activeSockets = activeSockets.filter(
            existingSocket => existingSocket !== socket.id
        );
        socket.broadcast.emit("remove-user", {
            socketId: socket.id
        });
    });



})

app.use(express.static(path.join(__dirname, "../client")));



//Port
app.set('port', 9090);
//server code
server.listen(app.get('port'), async () => {
    console.log(`running → PORT ${app.get('port')}`);
});

module.exports = server;