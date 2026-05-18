import { Router } from "express";
import { productController } from "../../controllers/product.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { productSchema } from "../../validators/product.schema";

const r = Router();
r.get("/", productController.list);
r.get("/:id", productController.get);
r.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(productSchema),
  productController.create,
);
r.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(productSchema.partial()),
  productController.update,
);
r.delete("/:id", requireAuth, requireRole("ADMIN"), productController.remove);
export default r;
