import { productRepository } from "../repositories/product.repository";
import { ApiError } from "../utils/ApiError";
import { ProductDTO } from "../validators/product.schema";

export const productService = {
  list: () => productRepository.list(),
  get: async (id: string) => {
    const p = await productRepository.findById(id);
    if (!p) throw new ApiError(404, "Product not found");
    return p;
  },
  create: (dto: ProductDTO) => productRepository.create(dto),
  update: async (id: string, dto: Partial<ProductDTO>) => {
    await productService.get(id);
    return productRepository.update(id, dto);
  },
  remove: async (id: string) => {
    await productService.get(id);
    return productRepository.remove(id);
  },
};
