import { prisma } from "../config/prisma";
import { CategoryDTO } from "../validators/category.schema";

export const categoryRepository = {
  list: async () => {
    const cats = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { products: true } } },
    });
    return cats.map((c) => {
      const { _count, ...rest } = c as any;
      return { ...rest, productCount: _count?.products ?? 0 };
    });
  },
  findById: (id: string) => prisma.category.findUnique({ where: { id } }),
  create: (data: CategoryDTO) => prisma.category.create({ data }),
  update: (id: string, data: Partial<CategoryDTO>) =>
    prisma.category.update({ where: { id }, data }),
  countProducts: (categoryId: string) =>
    prisma.product.count({ where: { categoryId } }),
  remove: (id: string) => prisma.category.delete({ where: { id } }),
};
