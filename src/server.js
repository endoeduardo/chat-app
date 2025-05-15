import express from "express";
import url from "url";
import path from "path";
import http from "http";
import {Server} from "socket.io";

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
});