import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { success } from "../utils/response";
import { authService } from "../services/auth.service";

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.register(req.body);
    success(res, data, "Registered", 201);
  }),
  login: asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.login(req.body);
    success(res, data, "Logged in successfully!");
  }),
  me: asyncHandler(async (req: Request, res: Response) => {
    const data = await authService.me(req.user!.id);
    success(res, data);
  }),
};
