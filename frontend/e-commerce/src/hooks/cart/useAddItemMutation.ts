import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/api/shop/cartApi";
import { toast } from "react-toastify";

/**
 * Custom hook for adding an item to the cart.
 * Uses `useMutation` from `react-query` to handle the mutation.
 * 
 * @returns {MutationResult} The result of the mutation.
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
        onError: () => {
            toast.error(`Error adding item to cart, try to sign in`, {
                position: "bottom-center"
            }
            );
        },
    });
}