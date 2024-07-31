import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import { ErrorApiResponse } from "@/types/error/ErrorResponse";

/**
 * Custom hook for adding an item to the cart.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * 
 * @returns The result of the mutation.
 */
export const useAddItemMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item added to cart", {
                position: "bottom-center"
            });
            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });

        },
        onError: (err: ErrorApiResponse) => {
            if (err.response.data) {
                toast.error(`Error adding item to cart: ${err.response.data.message}`, {
                    position: "bottom-center"
                });
            } else toast.error(`Error adding item to cart`)
        },
    });
}