import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { ProductDTO, ProductListQuery } from "../validators/product.schema";
import {
  PaginatedResult,
  getPagination,
  getPaginationMeta,
} from "../utils/pagination";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export const productRepository = {
  list: async (
    params: ProductListQuery,
  ): Promise<PaginatedResult<ProductWithCategory>> => {
    const { categoryId, page, limit } = params;
    const where = categoryId ? { categoryId } : undefined;
    const { skip, take } = getPagination({ page, limit });

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      items,
      meta: getPaginationMeta({ page, limit }, total),
    };
  },
  findById: (id: string) =>
    prisma.product.findUnique({ where: { id }, include: { category: true } }),
  create: (data: ProductDTO) => prisma.product.create({ data }),
  update: (id: string, data: Partial<ProductDTO>) =>
    prisma.product.update({ where: { id }, data }),
  remove: (id: string) => prisma.product.delete({ where: { id } }),
};
