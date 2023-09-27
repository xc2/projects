export interface PaginationParam {
  cursor?: number | string;
  limit?: number | string;
}
export interface ResolvedPagination {
  cursor: number;
  limit: number;
  next: number | null;
}
export function createPaginationQuery(defaultSize = 10, maxSize = 100) {
  return function paginationQuery(
    pagination?: PaginationParam,
    total?: number,
  ): ResolvedPagination {
    const limit = Math.min(
      Math.max(1, Number(pagination?.limit) || defaultSize),
      maxSize,
    );
    const cursor = Math.max(0, Number(pagination?.cursor) || 0);
    let next = limit + cursor;

    if (total && total < next + 1) {
      next = null;
    }

    return { cursor, limit, next };
  };
}

export type PaginationQueryFN = (
  pagination?: PaginationParam,
  total?: number,
) => ResolvedPagination;
