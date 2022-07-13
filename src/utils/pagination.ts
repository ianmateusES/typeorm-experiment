interface IResponsePagination<T> {
  data: T[];
  count: number | null;
}

interface IMeta {
  page: number;
  take: number;
  itemCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface IPagination<T> {
  data: T[];
  meta: IMeta;
}

const calculateTakeSkip = (page: number, size: number, limitTake = 100) => {
  const take = size > limitTake ? limitTake : size;
  const skip = (page - 1) * take;

  return { take, skip };
};

const calculateMeta = (take: number, skip: number, count: number) => {
  const current_page = skip / take + 1;
  const pageCount = Math.ceil(count / take);
  const hasPreviousPage = current_page > 1;
  const hasNextPage = current_page < pageCount;
  return {
    page: current_page,
    take,
    itemCount: count,
    hasPreviousPage,
    hasNextPage,
  };
};

export { IResponsePagination, IPagination, calculateTakeSkip, calculateMeta };
