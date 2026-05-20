import { createActivityLog } from "@/models/ActivityLog";
import { orderRepository } from "../repositories/order.repository";
import { productRepository } from "../repositories/product.repository";
import { ApiError } from "../utils/ApiError";
import { OrderDTO } from "../validators/order.schema";
import { OrderStatus } from "@prisma/client";

export const orderService = {
  list: () => orderRepository.list(),
  create: async (dto: OrderDTO, userId?: string) => {
    const products = await Promise.all(
      dto.items.map(async (i) => {
        const p = await productRepository.findById(i.productId);
        if (!p) throw new ApiError(404, `Product ${i.productId} not found`);
        return { ...p, quantity: i.quantity };
      }),
    );
    const total = products.reduce((s, p) => s + p.price * p.quantity, 0);

    const order = await orderRepository.create({
      customer: dto.customer,
      phone: dto.phone,
      address: dto.address,
      payment: dto.payment,
      email: dto.email,
      total,
      ...(userId ? { user: { connect: { id: userId } } } : {}),
      items: {
        create: products.map((p) => ({
          productId: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
      },
    });

    await createActivityLog({
      userId,
      action: "ORDER_CREATED",
      meta: { orderId: order.id, total },
    }).catch(() => undefined);

    return order;
  },
  updateStatus: async (id: string, status: OrderStatus) => {
    const found = await orderRepository.findById(id);
    if (!found) throw new ApiError(404, "Order not found");
    return orderRepository.updateStatus(id, status);
  },
};
