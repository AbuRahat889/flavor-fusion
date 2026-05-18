import { Router } from "express";
import auth from "./auth.routes";
import categories from "./category.routes";
import products from "./product.routes";
import orders from "./order.routes";

const r = Router();
r.get("/health", (_req, res) => res.json({ success: true, message: "ok" }));
r.use("/auth", auth);
r.use("/categories", categories);
r.use("/products", products);
r.use("/orders", orders);
export default r;
