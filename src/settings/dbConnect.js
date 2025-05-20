import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
configDotenv({ path: path.join(__dirname, '../../.env') });

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}

const client = new MongoClient(process.env.MONGO_URI);
let chatCollection;

try {
    await client.connect();
    const db = client.db('chat_db');
    console.log('✅ MongoDB connected');
    chatCollection = db.collection("chatCollection");

    // Create an index on chatTitle for better query performance
    await chatCollection.createIndex({ chatTitle: 1 });
} catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
}

export { chatCollection };