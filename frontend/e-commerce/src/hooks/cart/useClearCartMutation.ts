import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartActions, clearCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";

/**
 * Custom hook for clearing the cart mutation.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * @returns The clear cart mutation function.
 */
export const useClearCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CartActions, ApiError>({
        mutationFn: clearCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Cart cleared", {
                position: "bottom-center"
            });

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (error) => {
            if (error.response && error.response?.data.message) {
                toast.error(`Error clearing cart: ${error.response.data.message}`, {
                    position: "bottom-center"
                });
            } else toast.error(`Error clearing cart`, {
                position: "bottom-center"
            });
        },
    });
}