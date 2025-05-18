import { chatCollection } from "./dbConnect.js";

async function fetchAllChatSessions () {
    const conversations = await chatCollection.find();
    if (conversations) {
        const chatTitles = [];
        for await (const chat of conversations) {
            chatTitles.push(chat.chatTitle);
        }
        
        return chatTitles;
    } else {
        console.log("No chat session found!")
    };
};

export { fetchAllChatSessions };