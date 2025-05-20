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

async function saveMessage(room, message) {
    try {
        // First, check if the room exists
        const existingRoom = await chatCollection.findOne({ chatTitle: room });
        
        if (!existingRoom) {
            // If room doesn't exist, create it with initial message
            const result = await chatCollection.insertOne({
                chatTitle: room,
                messages: [message],
                createdAt: new Date()
            });
            console.log(`Created new room ${room} with first message`);
            return true;
        }
        
        // If room exists, append the message
        const result = await chatCollection.updateOne(
            { chatTitle: room },
            { 
                $push: { 
                    messages: message 
                }
            }
        );
        
        if (result.modifiedCount === 1) {
            console.log(`Message saved to room ${room}`);
            return true;
        } else {
            console.error(`Failed to save message to room ${room}`);
            return false;
        }
    } catch (error) {
        console.error('Error saving message:', error);
        return false;
    }
}

async function getRoomMessages(room) {
    try {
        console.log(`Fetching messages for room: ${room}`);
        const roomData = await chatCollection.findOne({ chatTitle: room });
        
        if (!roomData) {
            console.log(`Room ${room} not found, initializing empty room`);
            await chatCollection.insertOne({
                chatTitle: room,
                messages: [],
                createdAt: new Date()
            });
            return [];
        }
        
        console.log(`Found ${roomData.messages?.length || 0} messages in room ${room}`);
        return roomData.messages || [];
    } catch (error) {
        console.error('Error fetching room messages:', error);
        return [];
    }
}

export { fetchAllChatSessions, saveMessage, getRoomMessages };