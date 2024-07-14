import { ApiRequestConfig } from "./api.types";
import api from "./api";

const URLS = {
    fetchProducts: "/store",
    fetchCategories: "/store/categories",
}

export type Item = {
    id: number,
    name: string,
    description: string,
    price: string,
    image: string,
};

export type StoreDataResponse = {
    items: Item[],
    totalPages: number,
    currentPage: number,
    perPage: number,
};

export type Category = {
    id: number,
    name: string,
    description: string,
}

export type CategoryResponse = Category[];


export const fetchStore = (config: ApiRequestConfig = {}) => api.get<StoreDataResponse>(URLS.fetchProducts, config).then((res) => res.data);

export const fetchCategories = (config: ApiRequestConfig = {}) => api.get<CategoryResponse>(URLS.fetchCategories, config).then((res) => res.data);


