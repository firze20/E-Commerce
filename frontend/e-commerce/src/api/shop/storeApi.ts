import { ApiRequestConfig } from "../api.types";
import api from "../api";
import { buildQueryString } from "@/helpers/buildQueryString";

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
  categories: string[];
}

export type ItemResponse = {
  item: ItemDetails;
};

/**
 * Fetches store data from the API.
 *
 * @param params - The parameters for the API request.
 * @param config - The configuration for the API request.
 * @returns A promise that resolves to the store data response.
 */
export const fetchStore = (params: Record<string, any>, config: ApiRequestConfig = {}) => {
  const queryString = buildQueryString(params);
  return api
    .get<StoreDataResponse>(`${URLS.fetchProducts}${queryString}`, config)
    .then((res) => res.data);
};

/**
 * Fetches the categories from the API.
 *
 * @param config - Optional configuration for the API request.
 * @returns A Promise that resolves to the category response data.
 */
export const fetchCategories = (config: ApiRequestConfig = {}) =>
  api
    .get<CategoryResponse>(URLS.fetchCategories, config)
    .then((res) => res.data);

/**
 * Fetches a single product from the API.
 *
 * @param id - The ID of the product to fetch.
 * @param config - Optional configuration for the API request.
 * @returns A Promise that resolves to the fetched product.
 */
export const fetchSingleProduct = (id: number, config: ApiRequestConfig = {}) =>
    api
      .get<ItemResponse>(URLS.fetchSingleProduct.replace(":id", id.toString()), config)
      .then((res) => res.data);