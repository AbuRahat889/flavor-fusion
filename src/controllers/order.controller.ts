import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/response";
import { orderService } from "../services/order.service";
import { orderListQuerySchema } from "../validators/order.schema";

export const orderController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const query = orderListQuerySchema.parse(req.query);
    success(res, await orderService.list(query));
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    success(
      res,
      await orderService.create(req.body, req.user?.id),
      "Order created successfully!",
      201,
    );
  }),
  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    success(
      res,
      await orderService.updateStatus(req.params.id, req.body.status),
      "Order status updated successfully!",
    );
  }),
};
