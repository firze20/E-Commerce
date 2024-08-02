import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, CartActions, AddToCartParams } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";

/**
 * Custom hook for adding an item to the cart.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * 
 * @returns The result of the mutation.
 */
export const useAddItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CartActions, ApiError, AddToCartParams>({
        mutationFn: addToCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item added to cart", {
                position: "bottom-center"
            });
            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });

        },
        onError: (error) => {
            if (error.response && error.response?.data.message) {
                toast.error(`Error adding item to cart: ${error.response.data.message}`, {
                    position: "bottom-center"
                });
            } else toast.error(`Error adding item to cart`)
        },
    });
}