import { createApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import { ensureDefaultAdmin } from "./utils/seed";

const start = async () => {
  await connectDB();
  await ensureDefaultAdmin();
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`🍔 API ready on http://localhost:${env.port}${env.apiPrefix}`);
  });
};

start().catch((e) => {
  console.error("[fatal]", e);
  process.exit(1);
});
