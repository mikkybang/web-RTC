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
    console.log(socket.id)
    const existingSocket = activeSockets.find(
        existingSocket => existingSocket == socket.id
    );

    if (!existingSocket) {
        activeSockets.push(socket.id);
        console.log("YourId", activeSockets)
        socket.emit("yourId", socket.id);

        socket.broadcast.emit("users", {
            users: activeSockets
        });
    }


    socket.on("call-user", data => {
        io.to(data.to).emit("call-made", {
            offer: data.offer,
            socket: socket.id
        });
    });

    socket.on("make-answer", data => {
        io.to(data.to).emit("answer-made", {
            socket: socket.id,
            answer: data.answer
        });
    });

    socket.on("reject-call", data => {
        socket.to(data.from).emit("call-rejected", {
            socket: socket.id
        });
    });

    socket.on("disconnect", () => {
        console.log("disconecting")
        activeSockets = activeSockets.filter(
            existingSocket => existingSocket !== socket.id
        );
        socket.broadcast.emit("remove-user", {
            socketId: socket.id
        });
    });



})

app.use(express.static(path.join(__dirname, "../client/build")));



//Port
app.set('port', process.env.PORT || 9090);
//server code
server.listen(app.get('port'), async () => {
    console.log(`running → PORT ${app.get('port')}`);
});

module.exports = server;