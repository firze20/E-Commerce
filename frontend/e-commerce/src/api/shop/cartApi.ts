import { Item } from "../types";
import api from "../api";

const URLS = {
  myCart: "/store/my-cart",
  modifyMyCart: (id: string) => `/store/my-cart/${id}`,
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
  message: string;
};

export type Quantity = {
  quantity: number;
};

export type AddToCartParams = {
  id: number;
  quantity?: number;
};

export type RemoveFromCartParams = {
  id: number;
};

export type UpdateCartQuantityParams = {
  id: number;
  quantity: number;
};

/**
 * Retrieves the user's cart from the server.
 * @returns A promise that resolves to the user's cart.
 */
export const getMyCart = () =>
  api.get<Cart>(URLS.myCart, { withCredentials: true }).then((res) => res.data);

/**
 * Adds an item to the shopping cart.
 *
 * @param id - The ID of the item to add.
 * @param quantity - The quantity of the item to add (optional).
 * @returns A Promise that resolves to the modified cart actions.
 */
export const addToCart = ({ id, quantity }: AddToCartParams) =>
  api
    .post<CartActions>(
      URLS.modifyMyCart(id.toString()),
      { quantity: quantity },
      { withCredentials: true }
    )
    .then((res) => res.data);

/**
 * Removes an item from the cart.
 *
 * @param id - The ID of the item to be removed.
 * @returns A Promise that resolves to the updated cart actions.
 */
export const removeFromCart = ({ id }: RemoveFromCartParams) =>
  api
    .delete<CartActions>(URLS.modifyMyCart(id.toString()), {
      withCredentials: true,
    })
    .then((res) => res.data);

/**
 * Updates the quantity of an item in the cart.
 *
 * @param id - The ID of the item to update.
 * @param quantity - The new quantity of the item.
 * @returns A promise that resolves to the updated cart actions.
 */
export const updateCartQuantity = ({
  id,
  quantity,
}: UpdateCartQuantityParams) =>
  api
    .put<CartActions>(
      URLS.modifyMyCart(id.toString()),
      { quantity: quantity },
      { withCredentials: true }
    )
    .then((res) => res.data);

/**
 * Clears the cart by making a DELETE request to the specified URL.
 * @returns A Promise that resolves to the data returned by the server.
 */
export const clearCart = () =>
  api
    .delete<CartActions>(URLS.myCart, { withCredentials: true })
    .then((res) => res.data);
