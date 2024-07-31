import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Quantity } from "@/api/shop/cartApi";
import { updateCartQuantity } from "@/api/shop/cartApi";
import { toast } from "react-toastify";
import { ErrorApiResponse } from "@/types/error/ErrorResponse";

/**
 * Custom hook for updating the quantity of an item in the cart.
 * @returns A mutation function for updating the quantity of an item in the cart.
 */
export const useUpdateQuantityMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, quantity }: { id: number, quantity: Quantity }) => updateCartQuantity(id, quantity),
        onSuccess: () => {
            // Show a success toast 
            toast.success("Item quantity updated", {
                position: "top-center"
            });

            // Invalidate the cart query to trigger a refetch
            queryClient.invalidateQueries({ queryKey: ["my-cart"] });
        },
        onError: (err: ErrorApiResponse) => {
            if(err.response.data) {
                toast.error(`Error updating item quantity: ${err.response.data.message}`, {
                    position: "top-center"
                });
            } else toast.error(`Error updating item quantity`, {
                position: "top-center"
            });
        },
    });
}