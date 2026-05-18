import { categoryRepository } from "../repositories/category.repository";
import { ApiError } from "../utils/ApiError";
import { CategoryDTO } from "../validators/category.schema";

export const categoryService = {
  list: () => categoryRepository.list(),
  create: (dto: CategoryDTO) => categoryRepository.create(dto),
  update: async (id: string, dto: Partial<CategoryDTO>) => {
    const found = await categoryRepository.findById(id);
    if (!found) throw new ApiError(404, "Category not found");
    return categoryRepository.update(id, dto);
  },
  remove: async (id: string) => {
    const found = await categoryRepository.findById(id);
    if (!found) throw new ApiError(404, "Category not found");
    return categoryRepository.remove(id);
  },
};
