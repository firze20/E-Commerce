import api from "../api";
import { Item, Category, Quantity } from "../types";

const URLS = {
  items: {
    newItem: "/manager/item",
    modifyOrDeleteItem: (id: number) => `/manager/item/${id}`,
  },
  stocks: {
    addStock: (id: number) => `/manager/stock/${id}/add`,
    removeStock: (id: number) => `/manager/stock/${id}/remove`,
  },
  category: {
    newCategory: "/manager/category",
    modifyOrDeleteCategory: (id: number) => `/manager/category/${id}`,
  },
};

export type ItemCreationParams = Omit<Item, "id"> & {
  categories: string[];
};

// Partial makes all properties optional
export type ItemModificationParams = Partial<ItemCreationParams & {
  stock: number;
}>;

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

export type UpdateCategoryParams = {
    id: number;
    body: CategoryModificationParams;
};

export type CategoryApiResponse = {
    message: string;
    category: Category;
};

// Stock
export type StockParams = {
  id: number;
  quantity?: Quantity;
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

/**
 * Creates a new item.
 *
 * @param body - The parameters for creating the item.
 * @returns A promise that resolves to the response data of the created item.
 */
export const createItem = (body: ItemCreationParams) =>
  api
    .post<ItemApiResponse>(URLS.items.newItem, body, { withCredentials: true })
    .then((res) => res.data);

/**
 * Updates an item.
 *
 * @param params - The parameters for updating the item.
 * @returns A promise that resolves to the updated item.
 */
export const updateItem = (params: UpdateItemParams) =>
  api
    .put<ItemApiResponse>(URLS.items.modifyOrDeleteItem(params.id), params.body, { withCredentials: true })
    .then((res) => res.data);

/**
 * Deletes an item with the specified ID.
 * @param id - The ID of the item to delete.
 * @returns A promise that resolves to the deleted response data.
 */
export const deleteItem = (id: number) =>
    api
        .delete<DeletedResponse>(URLS.items.modifyOrDeleteItem(id), { withCredentials: true })
        .then((res) => res.data);

// Category API calls

/**
 * Creates a new category.
 *
 * @param params - The parameters for creating the category.
 * @returns A promise that resolves to the response data of the created category.
 */
export const createCategory = (params: CategoryCreationParams) =>
    api
        .post<CategoryApiResponse>(URLS.category.newCategory, params, { withCredentials: true })
        .then((res) => res.data);

/**
 * Updates a category.
 *
 * @param params - The parameters for updating the category.
 * @returns A promise that resolves to the updated category response.
 */
export const updateCategory = (params: UpdateCategoryParams) =>
    api
        .put<CategoryApiResponse>(URLS.category.modifyOrDeleteCategory(params.id), params.body, { withCredentials: true })
        .then((res) => res.data);

/**
 * Deletes a category by its ID.
 *
 * @param id - The ID of the category to delete.
 * @returns A promise that resolves to the deleted response data.
 */
export const deleteCategory = (id: number) =>
    api
        .delete<DeletedResponse>(URLS.category.modifyOrDeleteCategory(id), { withCredentials: true })
        .then((res) => res.data);

// Stock API calls

/**
 * Adds a stock to ta respctive item.
 *
 * @param params - The stock parameters, id of the item and quantity.
 * @returns A promise that resolves to the stock API response.
 */
export const addStock = (params: StockParams) =>
    api
        .post<StockApiResponse>(URLS.stocks.addStock(params.id), params.quantity, { withCredentials: true })
        .then((res) => res.data);

/**
 * Removes stock from the Item.
 *
 * @param params - The stock parameters, id and quantity to remove.
 * @returns A promise that resolves to the stock API response.
 */
export const removeStock = (params: StockParams) =>
    api
        .post<StockApiResponse>(URLS.stocks.removeStock(params.id), params.quantity, { withCredentials: true })
        .then((res) => res.data);

