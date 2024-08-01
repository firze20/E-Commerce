import api from "../api";
import type { Item } from "./storeApi";
import { buildQueryString } from "@/helpers/buildQueryString";

const URLS = {
  myCart: "/store/purchase",
};

type ItemPurchase = Omit<Item, "id">;

export type PurchaseActionResponse = {
  message: string;
};

type Purchase = {
  id: number;
  totalPrice: string;
  createdAt: string;
  items: ItemPurchase[];
};

export type PurchaseResponse = {
  purchases: Purchase[];
  totalPages: number;
  currentPage: number;
  perPage: number;
};

/**
 * Makes a purchase by sending a POST request to the specified URL.
 * This function returns a Promise that resolves to the response data.
 *
 * @returns A Promise that resolves to the response data.
 */
export const makePurchase = () =>
  api
    .post<PurchaseActionResponse>(URLS.myCart, null, { withCredentials: true })
    .then((res) => res.data);

/**
 * Retrieves the purchases made by the user.
 * @param params - The parameters for the API request.
 * @returns A Promise that resolves to the response data containing the user's purchases.
 */
export const getMyPurchases = (params: Record<string, any>) => {
  const queryString = buildQueryString(params);
  return api
    .get<PurchaseResponse>(`${URLS.myCart}`, {
      withCredentials: true,
    })
    .then((res) => res.data);
};
