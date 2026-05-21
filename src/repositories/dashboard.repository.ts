import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

type RecentOrder = Prisma.OrderGetPayload<{
  select: {
    id: true;
    customer: true;
    total: true;
    status: true;
    createdAt: true;
  };
}>;

export type DashboardOverview = {
  categories: number;
  totalItems: number;
  monthlyOrders: number;
  monthlyRevenue: number;
  todaysOrders: number;
  pendingOrders: number;
  recentOrders: RecentOrder[];
  categoryBreakdown: Array<{
    id: string;
    name: string;
    totalItems: number;
  }>;
};

const getStartOfDay = (date: Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getStartOfMonth = (date: Date) => {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const dashboardRepository = {
  overview: async (): Promise<DashboardOverview> => {
    const now = new Date();
    const startOfMonth = getStartOfMonth(now);
    const startOfDay = getStartOfDay(now);

    const [
      categories,
      totalItems,
      monthlyOrders,
      monthlyRevenue,
      todaysOrders,
      pendingOrders,
      recentOrders,
      categoryBreakdown,
    ] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { createdAt: { gte: startOfMonth } },
      }),
      prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          customer: true,
          total: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.category.findMany({
        select: {
          id: true,
          name: true,
          _count: {
            select: { products: true },
          },
        },
      }),
    ]);

    return {
      categories,
      totalItems,
      monthlyOrders,
      monthlyRevenue: monthlyRevenue._sum.total || 0,
      todaysOrders,
      pendingOrders,
      recentOrders,
      categoryBreakdown: categoryBreakdown
        .map((category) => ({
          id: category.id,
          name: category.name,
          totalItems: category._count.products,
        }))
        .sort((left, right) => right.totalItems - left.totalItems),
    };
  },
};
