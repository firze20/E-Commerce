import api from "../api";
import { ApiRequestConfig } from "../api.types";
import type { Item } from "./storeApi";
import { buildQueryString } from "@/helpers/buildQueryString";

const URLS = {
  myCart: "/store/purchase",
};

type ItemPurchase = Omit<Item, 'description'> & {
  quantity: number;
};

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
export const getMyPurchases = (params: Record<string, any>, config: ApiRequestConfig) => {
  const queryString = buildQueryString(params);
  return api
    .get<PurchaseResponse>(`${URLS.myCart}${queryString}`, {
      withCredentials: true,
      ...config,
    })
    .then((res) => res.data);
};
