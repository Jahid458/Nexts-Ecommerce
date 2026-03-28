import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  // ✅ Check INSIDE the function, not at top level
  const MONGODB_URL = process.env.MONGODB_URI;

  if (!MONGODB_URL) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "NEXT-JS-ECOMMERCE",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};