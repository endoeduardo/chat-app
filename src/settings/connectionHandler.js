import { chatCollection } from "./dbConnect.js";

async function fetchAllChatSessions() {
    try {
        const cursor = await chatCollection.find({});
        const chatTitles = [];
        
        await cursor.forEach(chat => {
            if (chat.chatTitle) {
                chatTitles.push(chat.chatTitle);
            }
        });
        
        console.log('Found chat sessions:', chatTitles);
        return chatTitles;
    } catch (error) {
        console.error('Error fetching chat sessions:', error);
        return [];
    }
}

export { fetchAllChatSessions };