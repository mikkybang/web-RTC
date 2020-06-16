import express, {Application, Request, Response, NextFunction } from "express";
import path from 'path'
import { createServer, Server as HTTPServer }  from 'http'
import SocketIO, { Server as SocketIOServer } from "socket.io"

const app: Application = express()
const server: HTTPServer = createServer(app)
const io: SocketIOServer = SocketIO(server)


io.on("connection", (socket) => {
    console.log("Socket connected")
})

app.use(express.static(path.join(__dirname, "../client")));



//Port
app.set('port', 9090);
//server code
server.listen(app.get('port'), async () => {
    console.log(`running → PORT ${app.get('port')}`);
});
  
  module.exports = server;