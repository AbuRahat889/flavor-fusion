import { prisma } from "../config/prisma";
import { CategoryDTO } from "../validators/category.schema";

export const categoryRepository = {
  list: () => prisma.category.findMany({ orderBy: { createdAt: "desc" } }),
  findById: (id: string) => prisma.category.findUnique({ where: { id } }),
  create: (data: CategoryDTO) => prisma.category.create({ data }),
  update: (id: string, data: Partial<CategoryDTO>) =>
    prisma.category.update({ where: { id }, data }),
  remove: (id: string) => prisma.category.delete({ where: { id } }),
};
