import { Router } from "express";
import { dashboardController } from "../../controllers/dashboard.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";

const r = Router();

r.get(
  "/overview",
  requireAuth,
  requireRole("ADMIN"),
  dashboardController.overview,
);

export default r;
