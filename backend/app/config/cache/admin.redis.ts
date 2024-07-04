const CACHE_PREFIX = 'admin';

const usersKeys = {
    singleUser: (id: string | number) => `${CACHE_PREFIX}/users:${id}`,
    allUsers: (
        page: number,
        limit: number,
        name?: string
    ) => {
        return `${CACHE_PREFIX}/users:${page}:${limit}:${name || ""}`;
    },
};


const purchaseKeys = {
    singlePurchase: (id: string | number) => `${CACHE_PREFIX}/purchases:${id}`,
    allPurchases: (
        page: number,
        limit: number,
        username?: string,
        minDate?: string,
        maxDate?: string
    ) => {
        return `${CACHE_PREFIX}/purchases:${page}:${limit}:${username || ""}:${minDate || ""}:${maxDate || ""}`;
    },
};

export { usersKeys, purchaseKeys };

