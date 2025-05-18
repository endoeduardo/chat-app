import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);


let db;

async function connectDB() {
    if (db) return db; // Return cached connection
    try {
        await client.connect();
        db = client.db('chat_db'); // Replace with your DB name
        console.log('✅ MongoDB connected');
        return db;
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        throw err;
    };
};

export { connectDB };