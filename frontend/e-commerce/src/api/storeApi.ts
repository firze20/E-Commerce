import api from "./api";

const URLS = {
    fetchProducts: "/store",
    fetchCategories: "/store/categories",
}

type Item = {
    id: number,
    name: string,
    description: string,
    price: string,
    image: string,
};

export type StoreData = {
    items: Item[],
    totalPages: number,
    currentPage: number,
    perPage: number,
};

export const fetchStore = () => {
    return api.get<StoreData>(URLS.fetchProducts);
};

type Category = {
    id: number,
    name: string,
    description: string
};

export type CategoriesData = {
    categories: Category[],
};

export const fetchCategories = () => {
    return api.get<CategoriesData>(URLS.fetchCategories);
}