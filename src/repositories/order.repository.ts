import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { OrderListQuery } from "../validators/order.schema";
import {
  PaginatedResult,
  getPagination,
  getPaginationMeta,
} from "../utils/pagination";

type OrderWithItems = Prisma.OrderGetPayload<{
  include: { items: true };
}>;

export const orderRepository = {
  list: async (
    params: OrderListQuery,
  ): Promise<PaginatedResult<OrderWithItems>> => {
    const { status, page, limit } = params;
    const where = status ? { status } : undefined;
    const { skip, take } = getPagination({ page, limit });

    const [items, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
        include: { items: true },
      }),
      prisma.order.count({ where }),
    ]);

    return {
      items,
      meta: getPaginationMeta({ page, limit }, total),
    };
  },

  findById: (id: string) =>
    prisma.order.findUnique({ where: { id }, include: { items: true } }),
  create: (data: Prisma.OrderCreateInput) =>
    prisma.order.create({ data, include: { items: true } }),
  updateStatus: (id: string, status: OrderStatus) =>
    prisma.order.update({ where: { id }, data: { status } }),
};
