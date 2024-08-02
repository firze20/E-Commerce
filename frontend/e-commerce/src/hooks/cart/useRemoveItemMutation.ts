import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart, CartActions, RemoveFromCartParams } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";

/**
 * Custom hook for removing an item from the cart.
 * @returns The mutation object with the remove item functionality.
 */
export const useRemoveItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CartActions, ApiError, RemoveFromCartParams>({
        mutationFn: removeFromCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item removed from cart", {
                position: "bottom-center"
            });
            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (error) => {
            if (error.response && error.response?.data.message) {
                toast.error(`Error removing item from cart: ${error.response.data.message}`, {
                    position: "bottom-center"
                });
            } else toast.error(`Error removing item from cart`, {
                position: "bottom-center"
            });
        },
    });
}