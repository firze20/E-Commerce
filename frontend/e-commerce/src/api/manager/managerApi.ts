import api from "../api";
import { Item, Category } from "../types";

const URLS = {
  items: {
    newItem: "/manager/item",
    modifyOrDeleteItem: (id: number) => `/manager/item/${id}`,
  },
  stocks: {
    addStock: (id: Number) => `/manager/stock/${id}/add`,
    removeStock: (id: number) => `/manager/stock/${id}/remove`,
  },
  category: {
    newCategory: "/manager/category",
    modifyOrDeleteCategory: (id: number) => `/manager/categories/${id}`,
  },
};

export type ItemCreationParams = Omit<Item, "id"> & {
  categories: string[];
};

// Partial makes all properties optional
export type ItemModificationParams = Partial<ItemCreationParams>;

export type UpdateItemParams = {
  id: number;
  body: ItemModificationParams;
};

type ItemResult = Item & {
    updatedAt: string;
    createdAt: string;
    stockId: number;
};

export type ItemApiResponse = {
    message: string;
    item: ItemResult;
};

export type DeletedResponse = {
    message: string;
};

export type CategoryCreationParams = Omit<Category, "id">;

// Partial makes all properties optional
export type CategoryModificationParams = Partial<CategoryCreationParams>;

export type CategoryApiResponse = {
    message: string;
    category: Category;
};

// Stock
export type StockApiParams = {
  quantity: number;
};

type ItemStockResponse = Item & {
  stock: number;
  categories: string[];
};

export type StockApiResponse = {
  message: string;
  item: ItemStockResponse;
};

// Api calls

// Item API calls

export const createItem = (body: ItemCreationParams) =>
  api
    .post<ItemApiResponse>(URLS.items.newItem, body, { withCredentials: true })
    .then((res) => res.data);

export const updateItem = (params: UpdateItemParams) =>
  api
    .put<ItemApiResponse>(URLS.items.modifyOrDeleteItem(params.id), params.body, { withCredentials: true })
    .then((res) => res.data);

export const deleteItem = (id: number) =>
    api
        .delete<DeletedResponse>(URLS.items.modifyOrDeleteItem(id), { withCredentials: true })
        .then((res) => res.data);

// Category API calls

export const createCategory = (params: CategoryCreationParams) =>
    api
        .post<CategoryApiResponse>(URLS.category.newCategory, params, { withCredentials: true })
        .then((res) => res.data);

export const updateCategory = (id: number, params: CategoryModificationParams) =>
    api
        .put<CategoryApiResponse>(URLS.category.modifyOrDeleteCategory(id), params, { withCredentials: true })
        .then((res) => res.data);

export const deleteCategory = (id: number) =>
    api
        .delete<DeletedResponse>(URLS.category.modifyOrDeleteCategory(id), { withCredentials: true })
        .then((res) => res.data);

// Stock API calls

export const addStock = (id: number, params: StockApiParams) =>
    api
        .post<StockApiResponse>(URLS.stocks.addStock(id), params, { withCredentials: true })
        .then((res) => res.data);

export const removeStock = (id: number, params: StockApiParams) =>
    api
        .post<StockApiResponse>(URLS.stocks.removeStock(id), params, { withCredentials: true })
        .then((res) => res.data);

