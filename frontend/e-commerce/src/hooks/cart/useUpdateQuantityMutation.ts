import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CartActions, UpdateCartQuantityParams } from "@/api/shop/cartApi";
import { updateCartQuantity } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import type { ApiError } from "@/api/api.types";

/**
 * Custom hook for updating the quantity of an item in the cart.
 * @returns A mutation function for updating the quantity of an item in the cart.
 */
export const useUpdateQuantityMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<CartActions, ApiError, UpdateCartQuantityParams>({
        mutationFn: updateCartQuantity,
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item quantity updated", {
                position: "top-center"
            });

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (error) => {
            if(error.response && error.response?.data.message) {
                toast.error(`Error updating item quantity: ${error.response.data.message}`, {
                    position: "top-center"
                });
            } else toast.error(`Error updating item quantity`, {
                position: "top-center"
            });
        },
    });
}