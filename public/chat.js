const socket = window.io(); // ✅ fix for modules

// const socket = io();

function sendMessage() {
    const input = document.getElementById("messageInput");
    const messageText = input.value.trim();

    if (messageText !== "") {
        socket.emit("text_sent", messageText);

        input.value = "";
        input.focus();
    }
}

function addTextMessageToChatBox(messageText) {
    const messageDiv = document.createElement("div");
    const chatBox = document.getElementById("chatBox");
    
    messageDiv.className = "message";
    messageDiv.textContent = messageText;
    chatBox.appendChild(messageDiv);
    
    chatBox.scrollTop = chatBox.scrollHeight;
};

socket.on("incoming_text", addTextMessageToChatBox);

// Set up event listeners after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendButton").addEventListener("click", sendMessage);
    document.getElementById("messageInput").addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });
});