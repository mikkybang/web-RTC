import io from "socket.io-client";
const SOCKETIO = "localhost:9090";

export const socketConnection = io(SOCKETIO, { jsonp: false, transports: ["websocket"] });
