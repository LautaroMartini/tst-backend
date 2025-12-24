import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", socket => {
    socket.on("join-room", room => socket.join(room));
    socket.on("offer", (room, offer) => socket.to(room).emit("offer", offer));
    socket.on("answer", (room, answer) => socket.to(room).emit("answer", answer));
    socket.on("ice-candidate", (room, c) => socket.to(room).emit("ice-candidate", c));
    socket.on("text-msg", (room, msg) => io.to(room).emit("text-msg", msg));
});

server.listen(process.env.PORT || 3000);
