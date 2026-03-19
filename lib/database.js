import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

if(!MONGODB_URL) {
   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let catched = global.mongoose;

if (!catched) {
  catched = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  if (catched.conn) return catched.conn;
  if (!catched.promise) {
    catched.promise = mongoose.connect(MONGODB_URL, {
      dbName: "Ecommerce-nextjs",
      bufferCommands: false,
    });
  }
    catched.conn = await catched.promise;
    return catched.conn;
};
