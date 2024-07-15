import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/foody");
    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};
