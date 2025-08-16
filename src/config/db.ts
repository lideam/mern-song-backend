import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    const isAtlas = process.env.MONGO_URI?.includes("mongodb+srv");

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host} (${
        isAtlas ? "Atlas Cloud" : "Local"
      })`
    );
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
