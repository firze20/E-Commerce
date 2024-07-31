import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import { ErrorApiResponse } from "@/types/error/ErrorResponse";

/**
 * Custom hook for clearing the cart mutation.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * @returns The clear cart mutation function.
 */
export const useClearCartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Cart cleared", {
                position: "bottom-center"
            });

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err: ErrorApiResponse) => {
            if (err.response.data) {
                toast.error(`Error clearing cart: ${err.response.data.message}`, {
                    position: "bottom-center"
                });
            } else toast.error(`Error clearing cart`, {
                position: "bottom-center"
            });
        },
    });
}