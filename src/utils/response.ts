import { Response } from "express";

export const success = <T>(
  res: Response,
  data: T,
  message = "OK",
  status = 200,
) => res.status(status).json({ success: true, message, data });

export const fail = (
  res: Response,
  message: string,
  status = 400,
  details?: unknown,
) => res.status(status).json({ success: false, message, details });
