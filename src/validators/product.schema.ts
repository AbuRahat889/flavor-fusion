import { z } from "zod";
export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  image: z.string().url().optional(),
  categoryId: z.string().uuid(),
});
export type ProductDTO = z.infer<typeof productSchema>;
