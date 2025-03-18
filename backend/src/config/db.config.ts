import mongoose from "mongoose";
import { envs } from "./env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(envs.MONGO_URI)

    console.log(`Successfully connected to the MongoDB database`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
