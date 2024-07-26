import type { Item } from "../shop/storeApi";
import api from "../api";

const URLS = {
  myCart: "/store/my-cart",
  modifyMyCart: "/store/my-cart/:id",
};

export type CartItem = Item & {
  quantity: number;
};

export type Cart = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export type CartActions = {
    message: string
};

export type Quantity = {
  quantity: number;
}

export const getMyCart = () =>
  api.get<Cart>(URLS.myCart, { withCredentials: true }).then((res) => res.data);

export const addToCart = (id: number, quantity?: number) =>
  api.post<CartActions>(URLS.modifyMyCart.replace(":id", id.toString()), quantity, { withCredentials: true }).then((res) => res.data);

export const removeFromCart = (id: number) =>
    api.delete<CartActions>(URLS.modifyMyCart.replace(":id", id.toString()), { withCredentials: true }).then((res) => res.data);

export const updateCartQuantity = (id: number, quantity: Quantity) =>
    api.put<CartActions>(URLS.modifyMyCart.replace(":id", id.toString()), quantity, { withCredentials: true }).then((res) => res.data);

export const clearCart = () =>
    api.delete<CartActions>(URLS.myCart, { withCredentials: true }).then((res) => res.data);


    