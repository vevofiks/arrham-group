import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "arrham"
        })

        isConnected = db.connections[0].readyState;
        console.log("✅ DB connected successfully");
    } catch (error) {
        console.error("❌ Error while connecting db:", error);
    }
}