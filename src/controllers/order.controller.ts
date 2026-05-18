import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/response";
import { orderService } from "../services/order.service";

export const orderController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    success(res, await orderService.list());
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    success(
      res,
      await orderService.create(req.body, req.user?.id),
      "Created",
      201,
    );
  }),
  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    success(
      res,
      await orderService.updateStatus(req.params.id, req.body.status),
      "Updated",
    );
  }),
};
