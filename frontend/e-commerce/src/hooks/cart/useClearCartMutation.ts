import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";

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
        onError: (err) => {
            toast.error(`Error clearing cart: ${err}`, {
                position: "bottom-center"
            });
        },
    });
}