import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";
configDotenv("../.env")

const client = new MongoClient(process.env.MONGO_URI);

let chatCollection;

try {
    await client.connect();
    const db = client.db('chat_db');
    console.log('✅ MongoDB connected');
    chatCollection = db.collection("chatCollection");
} catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
};

export { chatCollection };