import { z } from "zod";
export const orderSchema = z.object({
  customer: z.string().min(2),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  payment: z.enum(["cod", "card"]).default("cod"),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});
export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PREPARING", "DELIVERED", "CANCELLED"]),
});
export type OrderDTO = z.infer<typeof orderSchema>;
