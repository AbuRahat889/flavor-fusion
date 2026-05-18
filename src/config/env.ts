import dotenv from "dotenv";
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  apiPrefix: process.env.API_PREFIX ?? "/api/v1",
  databaseUrl: process.env.DATABASE_URL ?? "",
  mongoUri: process.env.MONGO_URI ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: process.env.CORS_ORIGIN ?? "*",
  defaultAdmin: {
    email: process.env.DEFAULT_ADMIN_EMAIL ?? "admin@flavor.com",
    password: process.env.DEFAULT_ADMIN_PASSWORD ?? "admin123",
    name: process.env.DEFAULT_ADMIN_NAME ?? "Super Admin",
  },
};
