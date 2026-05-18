import { Router } from "express";
import { orderController } from "../../controllers/order.controller";
import { requireAuth, requireRole } from "../../middlewares/auth";
import { validate } from "../../middlewares/validate";
import { orderSchema, orderStatusSchema } from "../../validators/order.schema";

const r = Router();
r.post("/", validate(orderSchema), orderController.create);
r.get("/", requireAuth, requireRole("ADMIN"), orderController.list);
r.patch(
  "/:id/status",
  requireAuth,
  requireRole("ADMIN"),
  validate(orderStatusSchema),
  orderController.updateStatus,
);
export default r;
