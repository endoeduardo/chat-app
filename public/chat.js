const socket = window.io();

// Get the room from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('session');

if (!room) {
    window.location.href = '/'; // Redirect to home if no room specified
} else {
    // Join the specific room
    socket.emit('join_room', room);
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const messageText = input.value.trim();

    if (messageText !== "") {
        // Send message with room information
        socket.emit("text_sent", {
            message: messageText,
            room: room
        });

        input.value = "";
        input.focus();
    }
}

function addTextMessageToChatBox(data) {
    // Only add message if it's for our room
    if (data.room === room) {
        const messageDiv = document.createElement("div");
        const chatBox = document.getElementById("chatBox");
        
        messageDiv.className = "message";
        messageDiv.textContent = data.message;
        chatBox.appendChild(messageDiv);
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

socket.on("incoming_text", addTextMessageToChatBox);

// Set up event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Add room name to the UI
    const title = document.createElement("h2");
    title.textContent = `Chat Room: ${room}`;
    document.querySelector(".chat-container").insertBefore(title, document.querySelector(".chat-box"));

    document.getElementById("sendButton").addEventListener("click", sendMessage);
    document.getElementById("messageInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });
});