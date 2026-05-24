import { z } from "zod";

export const orderSchema = z.object({
  customer: z
    .string({
      required_error: "Customer name is required",
    })
    .min(2, "Customer name must be at least 2 characters"),

  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1, "Phone number is required"),

  address: z
    .string({
      required_error: "Address is required",
    })
    .min(1, "Address is required"),

  email: z.string().email("Please enter a valid email address").optional(),

  payment: z
    .enum(["cod", "card"], {
      errorMap: () => ({
        message: "Payment method must be either COD or Card",
      }),
    })
    .default("cod"),

  items: z
    .array(
      z.object({
        productId: z
          .string({
            required_error: "Product ID is required",
          })
          .uuid("Invalid product ID format"),

        quantity: z
          .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
          })
          .int("Quantity must be an integer")
          .positive("Quantity must be greater than 0"),
      }),
    )
    .min(1, "At least one item is required"),
});

export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "PREPARING", "DELIVERED", "CANCELLED"], {
    errorMap: () => ({
      message: "Status must be PENDING, PREPARING, DELIVERED, or CANCELLED",
    }),
  }),
});

export const orderListQuerySchema = z.object({
  status: z
    .enum(["PENDING", "PREPARING", "DELIVERED", "CANCELLED"], {
      errorMap: () => ({
        message: "Status must be PENDING, PREPARING, DELIVERED, or CANCELLED",
      }),
    })
    .optional(),

  page: z.coerce
    .number({
      invalid_type_error: "Page must be a number",
    })
    .int("Page must be an integer")
    .positive("Page must be greater than 0")
    .default(1),

  limit: z.coerce
    .number({
      invalid_type_error: "Limit must be a number",
    })
    .int("Limit must be an integer")
    .positive("Limit must be greater than 0")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});

export type OrderDTO = z.infer<typeof orderSchema>;
export type OrderListQuery = z.infer<typeof orderListQuerySchema>;
