import { z } from "zod";
export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  image: z.string().url().optional(),
  categoryId: z.string().uuid(),
});

export const productListQuerySchema = z.object({
  categoryId: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type ProductDTO = z.infer<typeof productSchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
