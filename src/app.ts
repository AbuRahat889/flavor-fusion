import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
// @ts-ignore - xss-clean has no proper types
import xss from "xss-clean";
import { env } from "./config/env";
import { apiLimiter } from "./middlewares/rateLimit";
import { errorHandler, notFound } from "./middlewares/error";
import v1 from "./routes/v1";

export const createApp = (): Application => {
  const app = express();

  const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(xss());
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
  app.use(env.apiPrefix, apiLimiter);

  app.use(env.apiPrefix, v1);
  app.get("/", (_req, res) => {
    res.send("🍔 Welcome to Flavor Fusion API! 🍔");
  });

  app.use(notFound);
  app.use(errorHandler);
  return app;
};
