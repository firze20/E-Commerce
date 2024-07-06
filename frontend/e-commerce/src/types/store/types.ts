// Item type

type Item = {
    id: number,
    name: string,
    description: string,
    price: string,
    image: string,
};

// StoreData type

export type StoreData = {
    items: Item[],
    totalPages: number,
    currentPage: number,
    perPage: number,
};

type Category = {
    id: number,
    name: string,
    description: string
};

export type CategoriesData = {
    categories: Category[],
};

