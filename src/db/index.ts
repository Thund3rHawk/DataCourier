import mongoose from "mongoose";
require('dotenv').config();

export async function connectDB (){
    try {        
        const MONGODB_URI = process.env.MONGODB_URI
        await mongoose.connect (`${MONGODB_URI}`);
        console.log ("DB connected Successfully");
    } catch (error) {
        console.log ("Db error:", error);
    }
}