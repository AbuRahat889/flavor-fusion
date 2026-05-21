export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginationMeta = PaginationParams & {
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type PaginatedResult<T> = {
  items: T[];
  meta: PaginationMeta;
};

export const getPagination = ({ page, limit }: PaginationParams) => ({
  skip: (page - 1) * limit,
  take: limit,
});

export const getPaginationMeta = (
  params: PaginationParams,
  total: number,
): PaginationMeta => ({
  ...params,
  total,
  totalPages: Math.ceil(total / params.limit),
  hasNextPage: params.page * params.limit < total,
  hasPrevPage: params.page > 1,
});
