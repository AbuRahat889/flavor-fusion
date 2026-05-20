// import mongoose from "mongoose";
// import { env } from "./env";

// export const connectMongo = async (): Promise<void> => {
//   if (!env.mongoUri) {
//     console.warn("[mongo] MONGO_URI not set — skipping Mongo connection");
//     return;
//   }
//   await mongoose.connect(env.mongoUri);
//   console.log("[mongo] connected");
// };

// src/config/db.ts

import { Pool } from "pg";

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("[postgres] connected");
  } catch (error) {
    console.error("[postgres] connection failed", error);
  }
};
