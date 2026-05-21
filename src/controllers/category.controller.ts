import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/response";
import { categoryService } from "../services/category.service";

export const categoryController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    success(res, await categoryService.list());
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    success(
      res,
      await categoryService.create(req.body),
      "Category created successfully!",
      201,
    );
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    success(
      res,
      await categoryService.update(req.params.id, req.body),
      "Category updated successfully!",
    );
  }),
  remove: asyncHandler(async (req: Request, res: Response) => {
    await categoryService.remove(req.params.id);
    success(res, null, "Category deleted successfully!");
  }),
};
