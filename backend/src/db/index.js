import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(
            `MongoDB Connected !! DB HOST: ${connection.connection.host}`
        );
    } catch (error) {
        console.log("MongoDB connection error");
        process.exit(1);
    }
}

// `${process.env.MONGODB_URI}/${DB_NAME}`