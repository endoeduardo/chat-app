import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import { fetchAllChatSessions } from "./settings/connectionHandler.js"

const app = express();
const currentPath = url.fileURLToPath(import.meta.url);
const publicDirectory = path.join(currentPath, "../..", "public");
app.use(express.static(publicDirectory));

const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("request_chat_sessions", async (insertChatSessions) => {
        const chatSessions = await fetchAllChatSessions();
        insertChatSessions(chatSessions);
    });

    socket.on("text_sent", (textMessage) => {
        io.emit("incoming_text", textMessage);
    });
});