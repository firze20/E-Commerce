import api from "../api";
import { Item, Category } from "../types";

const URLS = {
    items: {
        newItem: "/manager/item",
        modifyOrDeleteItem: (id: string) => `/manager/item/${id}`,
    },
    stocks: {
        addStock: (id: string) => `/manager/stock/${id}/add`,
        removeStock: (id: string) => `/manager/stock/${id}/remove`,
    },
    category: {
        newCategory: "/manager/category",
        modifyOrDeleteCategory: (id: string) => `/manager/categories/${id}`,
    }
};

export type ItemCreationParams = Omit<Item, "id"> & {
    categories: string[];
};

// Partial makes all properties optional
export type ItemModificationParams = Partial<ItemCreationParams>;

export type StockActionParams = {
    quantity: number;
};

export type CategoryCreationParams = Omit<Category, "id">;

// Partial makes all properties optional
export type CategoryModificationParams = Partial<CategoryCreationParams>;




