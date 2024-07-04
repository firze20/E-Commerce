const CACHE_PREFIX = "store";

const itemKeys = {
  items: (
    page: number,
    limit: number,
    category?: string,
    minimumPrice?: number,
    maximumPrice?: number,
    name?: string
  ) => {
    return `${CACHE_PREFIX}:${page}:${limit}:${category || ""}:${minimumPrice || ""}:${maximumPrice || ""}:${name || ""}`;
  },
  singleItem: (id: string | number) => `${CACHE_PREFIX}/item:${id}`,
};

const categoryKeys = {
  allCategories: `${CACHE_PREFIX}/categories`,
  singleCategory: (id: string | number) => `${CACHE_PREFIX}/categories:${id}`,
};

const cartKeys = {
  userCart: (userId: string | number) => `${CACHE_PREFIX}/my-cart:${userId}`,
};

const purchaseKeys = {
  userPurchases: (
    userId: string | number,
    page: number,
    limit: number,
    minDate?: string,
    maxDate?: string
  ) => {
    const dateRange = `${minDate || ""}:${maxDate || ""}`;
    return `${CACHE_PREFIX}/purchase:${userId}:${page}:${limit}:${dateRange}`;
  },
};

export { itemKeys, categoryKeys, cartKeys, purchaseKeys };

