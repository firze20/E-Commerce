import { ApiRequestConfig } from "../api.types";
import api from "../api";

const URLS = {
  fetchProducts: "/store",
  fetchCategories: "/store/categories",
  fetchSingleProduct: "/store/item/:id",
};

export type Item = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

export type StoreDataResponse = {
  items: Item[];
  totalPages: number;
  currentPage: number;
  perPage: number;
};

export type Category = {
  id: number;
  name: string;
  description: string;
};

export type CategoryResponse = Category[];

type ItemDetails = Item & {
  stock: number;
  category: Category[];
}

export type ItemResponse = {
  item: ItemDetails;
};

// Function to build query string
const buildQueryString = (params: Record<string, any>) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : "";
};

export const fetchStore = (page: number = 1, filters: Record<string, any>, config: ApiRequestConfig = {}) => {
  const queryString = buildQueryString({ page, ...filters });
  return api
    .get<StoreDataResponse>(`${URLS.fetchProducts}${queryString}`, config)
    .then((res) => res.data);
};

export const fetchCategories = (config: ApiRequestConfig = {}) =>
  api
    .get<CategoryResponse>(URLS.fetchCategories, config)
    .then((res) => res.data);

export const fetchSingleProduct = (id: number, config: ApiRequestConfig = {}) =>
    api
      .get<ItemResponse>(URLS.fetchSingleProduct.replace(":id", id.toString()), config)
      .then((res) => res.data);