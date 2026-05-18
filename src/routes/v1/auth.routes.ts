import { Router } from "express";
import { authController } from "../../controllers/auth.controller";
import { validate } from "../../middlewares/validate";
import { loginSchema, registerSchema } from "../../validators/auth.schema";
import { requireAuth } from "../../middlewares/auth";
import { authLimiter } from "../../middlewares/rateLimit";

const r = Router();
r.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  authController.register,
);
r.post("/login", authLimiter, validate(loginSchema), authController.login);
r.get("/me", requireAuth, authController.me);
export default r;
