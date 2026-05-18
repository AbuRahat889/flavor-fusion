import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(422).json({
      success: false,
      message: "Validation error",
      details: err.flatten(),
    });
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
    });
  }
  const message = err instanceof Error ? err.message : "Internal server error";
  console.error("[error]", err);
  res.status(500).json({ success: false, message });
};
