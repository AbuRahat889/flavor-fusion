import { prisma } from "../config/prisma";
import { OrderStatus, Prisma } from "@prisma/client";

export const orderRepository = {
  list: () =>
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
  findById: (id: string) =>
    prisma.order.findUnique({ where: { id }, include: { items: true } }),
  create: (data: Prisma.OrderCreateInput) =>
    prisma.order.create({ data, include: { items: true } }),
  updateStatus: (id: string, status: OrderStatus) =>
    prisma.order.update({ where: { id }, data: { status } }),
};
