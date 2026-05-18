import { Router } from "express";
import { categoryController } from "../../controllers/category.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { categorySchema } from "../../validators/category.schema";

const r = Router();
r.get("/", categoryController.list);
r.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(categorySchema),
  categoryController.create,
);
r.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(categorySchema.partial()),
  categoryController.update,
);
r.delete("/:id", requireAuth, requireRole("ADMIN"), categoryController.remove);
export default r;
