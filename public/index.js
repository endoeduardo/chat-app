const socket = window.io();

// Request chat sessions when page loads
socket.emit("request_chat_sessions", (chatSessions) => {
    console.log("Received chat sessions:", chatSessions);
    if (chatSessions && chatSessions.length > 0) {
        chatSessions.forEach((chatSession) => {
            insertChatLink(chatSession);
        });
    } else {
        console.log("No chat sessions available");
    }
});

socket.on("send_list_of_chat_sessions", () => {
    console.log("hello");
});

function insertChatLink(chatSession) {
    const linkContainer = document.querySelector('.link-container');
    if (!linkContainer) {
        console.error('Link container not found');
        return;
    }

    const link = document.createElement('a');
    link.href = `/chat.html?session=${encodeURIComponent(chatSession)}`;
    link.textContent = chatSession;
    linkContainer.appendChild(link);
}