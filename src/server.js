import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import { fetchAllChatSessions, saveMessage, getRoomMessages } from "./settings/connectionHandler.js"

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

    socket.on("join_room", async (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
        
        // Send existing messages to the user when they join
        const messages = await getRoomMessages(room);
        socket.emit("load_messages", messages);
    });

    socket.on("text_sent", async (data) => {
        // Save the message to MongoDB
        await saveMessage(data.room, data.message);
        
        // Emit the message only to the specific room
        io.to(data.room).emit("incoming_text", {
            message: data.message,
            room: data.room
        });
    });

    socket.on("disconnect", () => {
        console.log('user disconnected');
    });
});