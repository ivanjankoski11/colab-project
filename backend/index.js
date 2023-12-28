const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    })
})

server.listen(3001, () => {
    console.log("Server is running");
})