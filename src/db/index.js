import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb=async ()=>{
    try {
        const connectionInstance=mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\nMongoDB connected !! DB HOST: ${(await connectionInstance).connection.host}`);
        
    } catch (error) {
        console.error("Mongoose connection error:", error);
        process.exit(1);
    }
}

export default connectDb;