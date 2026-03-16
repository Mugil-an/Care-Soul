import mongoose from "mongoose";

export const connectDB = async () =>{
    try{

        const MONGO_URI = process.env.MONGO_DB_URI;
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI);  
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed:", error.message);
    }
}

