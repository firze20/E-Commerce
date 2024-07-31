import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import { ErrorApiResponse } from "@/types/error/ErrorResponse";

/**
 * Custom hook for removing an item from the cart.
 * @returns The mutation object with the remove item functionality.
 */
export const useRemoveItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item removed from cart", {
                position: "bottom-center"
            });
            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err: ErrorApiResponse) => {
            if (err.response.data) {
                toast.error(`Error removing item from cart: ${err.response.data.message}`, {
                    position: "bottom-center"
                });
            } else toast.error(`Error removing item from cart`, {
                position: "bottom-center"
            });
        },
    });
}