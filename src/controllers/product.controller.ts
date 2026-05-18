import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/response";
import { productService } from "../services/product.service";

export const productController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    success(res, await productService.list());
  }),
  get: asyncHandler(async (req: Request, res: Response) => {
    success(res, await productService.get(req.params.id));
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    success(res, await productService.create(req.body), "Created", 201);
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    success(res, await productService.update(req.params.id, req.body), "Updated");
  }),
  remove: asyncHandler(async (req: Request, res: Response) => {
    await productService.remove(req.params.id);
    success(res, null, "Deleted");
  }),
};
