import { createApp } from "./app";
import { connectDB } from "./config/db";
import { prisma } from "./config/prisma";
import { env } from "./config/env";
import { ensureDefaultAdmin } from "./utils/seed";

const registerShutdownHandlers = () => {
  const shutdown = async (signal: string) => {
    try {
      await prisma.$disconnect();
      console.log(`[shutdown] closed database connections (${signal})`);
    } finally {
      process.exit(0);
    }
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
};

const start = async () => {
  await connectDB();
  await ensureDefaultAdmin();
  registerShutdownHandlers();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`🍔 API ready on http://localhost:${env.port}${env.apiPrefix}`);
  });
};

start().catch((e) => {
  console.error("[fatal]", e);
  process.exit(1);
});
