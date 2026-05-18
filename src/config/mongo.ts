import mongoose from "mongoose";
import { env } from "./env";

export const connectMongo = async (): Promise<void> => {
  if (!env.mongoUri) {
    console.warn("[mongo] MONGO_URI not set — skipping Mongo connection");
    return;
  }
  await mongoose.connect(env.mongoUri);
  console.log("[mongo] connected");
};
