import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/response";
import { dashboardService } from "../services/dashboard.service";

export const dashboardController = {
  overview: asyncHandler(async (_req: Request, res: Response) => {
    success(res, await dashboardService.overview());
  }),
};
