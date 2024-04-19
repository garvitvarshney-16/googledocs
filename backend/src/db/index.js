import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { MongoClient, ServerApiVersion } from "mongodb";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log(`MongoDB Connected !! DB HOST: ${connection.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:" + error);
    process.exit(1);
  }
};

// export const client = new MongoClient(process.env.MONGODB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// `${process.env.MONGODB_URI}/${DB_NAME}`
