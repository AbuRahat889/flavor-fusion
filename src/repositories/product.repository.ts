import { prisma } from "../config/prisma";
import { ProductDTO } from "../validators/product.schema";

export const productRepository = {
  list: () =>
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  findById: (id: string) =>
    prisma.product.findUnique({ where: { id }, include: { category: true } }),
  create: (data: ProductDTO) => prisma.product.create({ data }),
  update: (id: string, data: Partial<ProductDTO>) =>
    prisma.product.update({ where: { id }, data }),
  remove: (id: string) => prisma.product.delete({ where: { id } }),
};
