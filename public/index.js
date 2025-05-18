const socket = window.io();

socket.emit("request_chat_sessions", (chatSessions) => {
    chatSessions.forEach((chatSession) => {
        insertChatLink(chatSession);
    });
});

socket.on("send_list_of_chat_sessions", () => {
    console.log("hello");
});

function insertChatLink(chatSession) {
    console.log(chatSession);
};