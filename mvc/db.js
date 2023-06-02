import mongoose from 'mongoose'

export default async () => {
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/chat-app",
        )
        console.log("Connected to database...")
    } catch (error) {
        console.log("Could not connect to database.", error)
    }
}