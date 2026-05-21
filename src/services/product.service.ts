import { productRepository } from "../repositories/product.repository";
import { ApiError } from "../utils/ApiError";
import { ProductDTO, ProductListQuery } from "../validators/product.schema";

export const productService = {
list: (params: ProductListQuery) => productRepository.list(params),
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
    const orderItemCount = await productRepository.countOrderItems(id);
    if (orderItemCount > 0) {
      throw new ApiError(
        409,
        "This product cannot be deleted because it exists in one or more orders",
      );
    }
    return productRepository.remove(id);
  },
};
