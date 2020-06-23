"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var http_1 = require("http");
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var server = http_1.createServer(app);
var io = socket_io_1.default(server);
var activeSockets = [];
io.on("connection", function (socket) {
    console.log("Socket connected");
    var existingSocket = activeSockets.find(function (existingSocket) { return existingSocket === socket.id; });
    if (!existingSocket) {
        activeSockets.push(socket.id);
        socket.emit("update-user-list", {
            users: activeSockets.filter(function (existingSocket) { return existingSocket !== socket.id; })
        });
        socket.broadcast.emit("update-user-list", {
            users: [socket.id]
        });
    }
    socket.on("call-user", function (data) {
        socket.to(data.to).emit("call-made", {
            offer: data.offer,
            socket: socket.id
        });
    });
    socket.on("make-answer", function (data) {
        socket.to(data.to).emit("answer-made", {
            socket: socket.id,
            answer: data.answer
        });
    });
    socket.on("reject-call", function (data) {
        socket.to(data.from).emit("call-rejected", {
            socket: socket.id
        });
    });
    socket.on("disconnect", function () {
        activeSockets = activeSockets.filter(function (existingSocket) { return existingSocket !== socket.id; });
        socket.broadcast.emit("remove-user", {
            socketId: socket.id
        });
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../client")));
//Port
app.set('port', process.env.PORT || 9090);
//server code
server.listen(app.get('port'), function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("running \u2192 PORT " + app.get('port'));
        return [2 /*return*/];
    });
}); });
module.exports = server;
