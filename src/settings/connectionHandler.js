import { connectDB } from "./dbConnect";

const db = connectDB();

async function addNewChat(chatTitle) {
    const result = await db.createCollection(chatTitle);
    console.log(result);
};

export { addNewChat };